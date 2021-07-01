<template>
  <div class="container">
    <h1>The page you are looking for does not exist</h1>
    <router-link to="/" class="link"><h3>Go to the Home page</h3></router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  height: 100vh;
  .link {
    margin-top: 20px;
    text-decoration: none;
    h3 {
      color: skyblue;
      transition: 0.6s;
      &:hover {
        color: rgb(123, 192, 219);
        text-decoration: underline;
      }
    }
  }
}
</style>
