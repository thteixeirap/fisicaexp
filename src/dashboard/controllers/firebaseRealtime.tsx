/* eslint-disable react-hooks/rules-of-hooks */
import { ref, onValue, push } from "firebase/database";
import { StartFireBase } from "../../authFirebase";
import { useContext, useState } from "react";
import { ModalContext } from "../context/modalContext";
import { ModalContextDTO } from "../entities/modalContextDTO";
import regression from "regression";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import React from "react";
import { Paper } from "@mui/material";
import { ColumnData, Data } from "../entities/columnDataDTO";

export const addSeriesInChart = () => {
  const {
    chartUseRefTemp,
    chartUseRefReg,
    chartRGOpen,
// eslint-disable-next-line react-hooks/rules-of-hooks
  } = useContext(ModalContext) as ModalContextDTO;

  let temps: any = [];
  // eslint-disable-next-line prefer-const
  let TempToTable: any = [];
  const rows = [] as any
  const db = StartFireBase();

  let firstDataTimestamp = 0;

  const calculatorReg = () => {
    chartUseRefReg?.current?.chart.series[1]?.remove();
    chartUseRefReg?.current?.chart.series[0]?.remove();

    const slope = regression.linear(temps, {
      precision: 5,
    });
    const xs = [] as any;
    const ys = [];

    temps?.forEach(function (d: any) {
      xs.push(d[0]);
      ys.push(d[1]);
    });
    const r = slope.r2
    const m = slope.equation[0];
    const b = slope.equation[1];
    const eq = slope.string;
    const x0 = Math.min.apply(null, xs),
      y0 = m * x0 + b;
    const xf = Math.max.apply(null, xs),
      yf = m * xf + b;

    chartUseRefReg?.current?.chart.addSeries({
      type: "scatter",
      name: "Temperature (°C)",
      data: temps,
      marker: {
        radius: 4,
      },
    });

    chartUseRefReg?.current?.chart.addSeries({
      color: "red",
      type: "line",
      name: `Regression Line | ${eq} | r²: ${r}`,
      data: [
        [x0, y0],
        [xf, yf],
      ],
      marker: {
        enabled: true,
      },
      states: {
        hover: {
          lineWidth: 1,
        },
      },
      enableMouseTracking: false,
    });
    chartUseRefReg?.current?.chart.redraw();
    rows.push(rowsAux);
  };
  const handleOpenChart = (): void => {
    TempToTable.forEach((element: any[]) => {
      rowsAux.push(
        createData(element[0] as string, element[1] as any, element[2] as any)
      );
    });
    temps.length && calculatorReg();
    TempToTable = [];

  };

  const handleCleanChart = (): void => {

    temps = [];
    chartUseRefReg?.current?.chart.series[1]?.remove();
    chartUseRefReg?.current?.chart.series[0]?.remove();
    chartUseRefTemp?.current?.chart.series[0]?.remove();
  };

  function processTemperatureData(newData: any, temps: any): any {
    const processedDataItem = [0, newData[1]];
    if (temps.length === 0 && newData[1])
      firstDataTimestamp = newData[0] / 1000;

    if (temps.length === 1) {
      processedDataItem[0] = newData[0] / 1000 - firstDataTimestamp;
    } else if (temps.length > 0) {
      processedDataItem[0] = newData[0] / 1000 - firstDataTimestamp;
    }

    TempToTable.push([
      new Date(newData[0]).toLocaleString(),
      newData[1],
      processedDataItem[0],
    ]);
    temps.push(processedDataItem);
  }

  const realTime = () => {
    const dbRef = ref(db, "temperatura");
    onValue(dbRef, (snapshot) => {
      let data;
      const result = snapshot.val();
      if (typeof result === "number") {
        const date = new Date().getTime()
        data = [date, result];   
      } else {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.key) {
            data = [new Date().getTime(), childSnapshot.val()];
          }
        });
      }

      if (data) {
        processTemperatureData(data, temps);
        const hasSerie = chartUseRefTemp?.current?.chart.getOptions() as any;
        if (hasSerie.series.length === 0) {
          chartUseRefTemp?.current?.chart.addSeries({
            type: "line",
            name: "Temperature (°C)",
            data: [],
          });


        }
        chartUseRefTemp?.current?.chart.series[0].addPoint(data);

        chartUseRefReg?.current?.chart.redraw();
      }
    });
  };

  // Tabela

  const columns: ColumnData[] = [
    {
      width: 150,
      label: "Date",
      dataKey: "date",
    },
    {
      width: 120,
      label: "Temperature",
      dataKey: "temperature",
      numeric: true,
    },
    {
      width: 120,
      label: "Time Difference",
      dataKey: "timeDifference",
      numeric: true,
    },
  ];

  function createData(
    date: string,
    temperature: number,
    timeDifference: number
  ): Data {
    return { date, temperature, timeDifference };
  }

  const rowsAux: Data[] = [];


  const VirtuosoTableComponents: TableComponents<Data> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index: number, row: Data) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "right" : "left"}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  const returnTable = () => {
    return (
      <Paper style={{ height: 300, width: "100%" }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    );
  };

  return {
    realTime,
    chartUseRefTemp,
    chartUseRefReg,
    handleOpenChart,
    chartRGOpen,
    handleCleanChart,
    VirtuosoTableComponents,
    fixedHeaderContent,
    rowContent,
    returnTable,
  };
};
