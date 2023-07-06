Física Experimental - Calorímetro

Este trabalho tem como objetivo desenvolver uma plataforma web que recebe dados provenientes de um dispositivo ESP (microcontrolador) em conjunto com um sensor de temperatura. Os dados são transmitidos para a plataforma através do Firebase Realtime Database, permitindo a visualização e análise em tempo real das temperaturas coletadas.


### Execução 


```sh
    npm install
```

```sh
    npm run dev
```

### Funcionalidades Principais
A plataforma web oferece as seguintes funcionalidades principais:

Recebimento de dados em tempo real: Os dados de temperatura, enviados pelo dispositivo ESP, são armazenados e atualizados em tempo real no Firebase Realtime Database.
Plotagem em gráfico: A plataforma exibe os dados de temperatura em um gráfico, proporcionando uma visualização clara e intuitiva das variações ao longo do tempo.
Regressão Linear: Além da plotagem em tempo real, a plataforma permite a criação de uma regressão linear dos dados coletados. Essa análise estatística auxilia na compreensão das tendências e padrões das temperaturas registradas.
Tecnologias Utilizadas

### O projeto faz uso das seguintes tecnologias:

- Firebase Realtime Database: Utilizado para armazenar e sincronizar os dados de temperatura em tempo real.
- ESP (microcontrolador): Responsável pela coleta dos dados de temperatura e envio para o Firebase.
- Sensor de temperatura: Dispositivo conectado ao ESP que captura as temperaturas ambientais.
- Plataforma Web: Desenvolvida com tecnologias como HTML, CSS e JavaScript e React.js, proporcionando uma interface interativa para visualização e análise dos dados coletados.

### Firebase

Para vincular o firebase na plataforma, alguns dados terão que ser modificados, dados esses referentes as configurações encontradas no próprio site do Firebase.

- Abaixo está o passo a passo para encontrar as configurações necessárias para vincular o banco de dados à plataforma.

https://github.com/thteixeirap/fisicaexp/assets/78819692/a48ecf10-5047-469c-83d9-3ccecb6eab80

- Feito isso, basta substituir as informações dentro do arquivo authFirebase.ts 




