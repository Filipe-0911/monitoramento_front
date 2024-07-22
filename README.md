# Frontend responsivo para aplicação de Monitoramento de Estudos

Neste projeto utilizei React com Javascript puro.

## Requests

Os Requests são feitos utilizando a lib AXIOS. Foram criados Services para fazer os requests de cada entidade.

## Componentes

Os Componentes foram criados, em sua maioria, utilizando Styled Components.

## Rotas

Utilizei react-router-dom para criar as rotas e criei uma verificação para renderizar algumas páginas que são privadas. Caso o usuário não esteja autenticado ou o token esteja fora da validade, o usuário é redirecionado para a página de Login.
As únicas rotas que não requerem autenticação de usuário são: Login e Cadastro.
