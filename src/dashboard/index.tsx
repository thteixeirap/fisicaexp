// import Highcharts from "highcharts/highstock";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Boost from "highcharts/modules/boost";
import { temperatureChart } from "./chart/temperature";
import { regressionChart } from "./chart/regression";

import { useState } from "react";
import {
  Container,
  Main,
  Buttons,
  UniqueChart,
  ContainerTable,
} from "./styles";
import { addSeriesInChart } from "./controllers/firebaseRealtime";
import { Button } from "@mui/material";

import * as React from "react";

Boost(Highcharts);

export const Chart = () => {
  const [optionsTemp] = useState({
    ...temperatureChart(),
  });

  const [optionsReg] = useState({
    ...regressionChart(),
  });


  const {
    realTime,
    chartUseRefTemp,
    handleOpenChart,
    chartUseRefReg,
    handleCleanChart,
    VirtuosoTableComponents,
    fixedHeaderContent,
    rowContent,
    returnTable
  } = addSeriesInChart();


  realTime();

  return (
    <Main>
      <Container>
        <UniqueChart>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              ...optionsTemp,
            }}
            ref={chartUseRefTemp as React.Ref<HighchartsReact.RefObject>}
          />
        </UniqueChart>

        <UniqueChart>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              ...optionsReg,
            }}
            ref={chartUseRefReg as React.Ref<HighchartsReact.RefObject>}
          />
        </UniqueChart>
      </Container>

      <Buttons>
        <Button onClick={() => handleOpenChart()} variant="contained">
          Gerar Regressão Linear
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleCleanChart()}
        >
          Limpar Gráficos
        </Button>
      </Buttons>
      <>
        <ContainerTable>
          {/* <Paper style={{ height: 300, width: "100%" }}>
            
            <TableVirtuoso
            data={validar}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
            />
          </Paper> */}
          {returnTable()}
        </ContainerTable>
      </>
    </Main>
  );
};
