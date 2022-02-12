# [Calculadora](https://calculator-app-leodsc.netlify.app/)

[English](README_en.md)

### O que é esse app?

Uma simples calculadora que realiza as operações matemáticas básicas: somar, subtrair, multiplicar e dividir. Funciona tanto em dispositivos mobile quanto desktop. Para acessá-lo, entre no link acima ou por [aqui](https://calculator-app-leodsc.netlify.app/).

### Funcionalidades

<ul>
  <li>É possível adicionar um número usando o teclado do computador ou o mouse se estiver em um ambiente desktop. O app também funciona utilizando o touchscreen do celular.</li>
  <li>Não são aceitos números com mais de 15 digitos, tanto inteiros quanto decimais.</li>
  <li>O tema pode ser alterado usando o menu acima da tela da calculadora. A versão 1.0 conta com apenas 3 temas disponíveis.</li>
  <li>Caso seja colocado uma expressão inválida, por exemplo, "5x1+" a calculadora exibe um erro.</li>
  <li>Tentar adicionar dois pontos decimais em um único número também gera um erro.</li>
</ul>

### Como funciona

O app foi feito utilizando o framework [React.js](https://reactjs.org/) em conjunto com o [netlify](https://app.netlify.com/) para realizar o deploy. Os cálculos são feitos utilizando um algoritmo conhecido como [shunting yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm) que transforma notações infixas &#8213; como normalmente representamos expressões matemáticas &#8213; para [pós-fixa (ou notação polonesa inversa)](https://pt.wikipedia.org/wiki/Nota%C3%A7%C3%A3o_polonesa_inversa) que permite realizar os cálculos utilizando um algoritmo simples:

<ol>
  <li>Dentro do array de notação pós-fixa, retire da fila o primeiro elemento e o coloque em uma pilha;</li>
  <li>Repita o passo 1 até encontrar uma operação;</li>
  <li>Quando encontrar, desempilhe os dois últimos números que foram empilhados.</li>
  <li>Realize a operação com esses dois números e coloque o resultado na pilha</li>
  <li>Repita o processo até que a fila de notação pós-fixa esteja vazia.</li>
</ol>

[Essa imagem](https://www.includehelp.com/c/Images/post-fix-evolution.jpg) exemplifica o processo.

### Versões futuras:

<ul>

&#9744; Histórico de cálculos
<br>
&#9744; Reverter último cálculo
<br>
&#9744; Operador de porcentagem
<br>
&#9744; Modo de calculadora científica

</ul>
