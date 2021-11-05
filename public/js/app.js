axios.get('http://localhost:3000/weather/?address=incheon').then((res) => {
  console.log(res.data.forecast)
})
