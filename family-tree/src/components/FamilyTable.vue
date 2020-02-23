<template>
  <div class="family-table">
    <SortedTable :values="people" ascIcon="<span> ▲</span>" descIcon="<span> ▼</span>">
      <thead>
        <tr>
          <th scope="col">
            <SortLink name="id">ID</SortLink>
          </th>
          <th scope="col">
            <SortLink name="firstName">First Name</SortLink>
          </th>
          <th scope="col">
            <SortLink name="lastName">Last Name</SortLink>
          </th>
          <th scope="col">
            <SortLink name="birthDate">Day</SortLink>
          </th>
          <th scope="col">
            <SortLink name="birthMonth">Month</SortLink>
          </th>
          <th scope="col">
            <SortLink name="birthYear">Year</SortLink>
          </th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="sort">
        <tr v-for="value in sort.values" :key="value.id">
          <td>{{ value.id }}</td>
          <td>{{ value.firstName }}</td>
          <td>{{ value.lastName }}</td>
          <td>{{ value.birthDate }}</td>
          <td>{{ value.birthMonth }}</td>
          <td>{{ value.birthYear }}</td>
        </tr>
      </tbody>
    </SortedTable>
  </div>
</template>
<script>
import { SortedTable, SortLink } from "vue-sorted-table";
export default {
  name: "FamilyTable",
  components: {
    SortedTable,
    SortLink
  },
  props: {
    people: Array
  }
};
</script>
<style scoped>
th,
td {
  padding: 20px 50px;
  border: 1px solid #000;
  font-size: 20px;
  font-family: TrebuchetMS;
  text-align: center;
}

th a {
  color: white;
  text-decoration: none;
}

table {
  border-collapse: collapse;
}

thead {
  background: #ea6152;
  text-transform: uppercase;
}
</style>