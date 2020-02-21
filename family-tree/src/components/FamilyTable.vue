<template>
  <div class="family-table">
    <sorted-table :values="people">
      <thead>
        <tr>
          <th scope="col">
            <sort-link name="id">ID</sort-link>
          </th>
          <th scope="col">
            <sort-link name="firstName">First Name</sort-link>
          </th>
          <th scope="col">
            <sort-link name="lastName">Last Name</sort-link>
          </th>
          <th scope="col">
            <sort-link name="nickname">Nickname</sort-link>
          </th>
          <th scope="col">
            <sort-link name="birthDate">Day</sort-link>
          </th>
          <th scope="col">
            <sort-link name="birthMonth">Month</sort-link>
          </th>
          <th scope="col">
            <sort-link name="birthYear">Year</sort-link>
          </th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="sort">
        <tr v-for="value in sort.values" :key="value.id">
          <td>{{ value.id }}</td>
          <td>{{ value.firstName }}</td>
          <td>{{ value.lastName }}</td>
          <td>{{ value.nickname }}</td>
          <td>{{ value.birthDate }}</td>
          <td>{{ value.birthMonth }}</td>
          <td>{{ value.birthYear }}</td>
        </tr>
      </tbody>
    </sorted-table>
  </div>
</template>
<script>
export default {
  name: "FamilyTable",
  props: {
    people: Array
  }
};
</script>
<style scoped>
th, td {
    padding: 20px;
    border: 1px solid #000;
    font-size: 20px;
}
</style>