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
    returnTable,
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
          <h2>Regressão Linear</h2>
          A regressão linear dos mínimos quadrados é uma técnica estatística
          utilizada para modelar a relação entre uma variável dependente e uma
          ou mais variáveis independentes. No caso da regressão linear simples,
          há apenas uma variável independente. Essa técnica é amplamente
          utilizada para análise e previsão de dados em diversos campos,
          incluindo ciências sociais, econômicas e científicas. A ideia por trás
          da regressão linear dos mínimos quadrados é encontrar a linha reta que
          melhor se ajusta aos dados observados, minimizando a soma dos
          quadrados dos erros entre os valores previstos pela linha de regressão
          e os valores reais. Essa linha de regressão é representada por uma
          equação na forma y = mx + b, onde "y" é a variável dependente (nesse
          caso, a temperatura), "x" é a variável independente (por exemplo, o
          tempo) e "m" e "b" são os coeficientes da regressão. Ao traçar o
          gráfico com a temperatura e a linha de regressão, você poderá observar
          visualmente a relação entre as variáveis e a qualidade do ajuste. Se a
          linha de regressão for uma boa representação dos dados, os pontos
          observados devem estar próximos a ela. Se houver uma dispersão
          significativa em torno da linha, pode indicar uma relação mais
          complexa ou outros fatores que não estão sendo considerados pelo
          modelo linear simples. É importante lembrar que a regressão linear dos
          mínimos quadrados pressupõe que a relação entre as variáveis seja
          linear e que os erros de medição sejam aleatórios e independentes.
          Além disso, é necessário analisar os resultados estatísticos, como o
          coeficiente de determinação (R²), para avaliar a qualidade do ajuste e
          a significância estatística dos coeficientes da regressão.
        </ContainerTable>
      </>
    </Main>
  );
};
