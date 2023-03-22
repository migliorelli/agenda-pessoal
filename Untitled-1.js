itens = [
  { num: 5, data: "2022/10/02" },
  { num: 2, data: "2022/03/02" },
  { num: 3, data: "2022/04/02" },
  { num: 1, data: "2022/01/02" },
  { num: 4, data: "2022/08/02" },
]


itens.forEach(i => {
  console.log(i)
})

console.log("/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/")

itens.sort((a, b) => {
  
  const A = a.data.split("/");
  const dataA = new Date(
    parseInt(A[2], 10),
    parseInt(A[1], 10) - 1,
    parseInt(A[0], 10)
  );

  const B = b.data.split("/");
  const dataB = new Date(
    parseInt(B[2], 10),
    parseInt(B[1], 10) - 1,
    parseInt(B[0], 10)
  );

  return dataA - dataB;
});

itens.forEach(i => {
  console.log(i)
})