<template>
  <div class="person">
    <div class="person-image">
      <img :src="image" />
    </div>
    <div class="person-name">{{shortName}}</div>
    <div class="person-details">
      <div class="person-bday person-detail" v-if="personInfo.birthDate">{{birthday}}</div>
      <div
        v-if="personInfo.description"
        class="person-description person-detail"
      >{{personInfo.description}}</div>
    </div>
  </div>
</template>
<script>
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const DUMMY_IMG =
  "https://drive.google.com/uc?id=1BwYrNPG9--Ap_khMAL_eoQ0YtluSuhHW";

export default {
  name: "Person",
  props: {
    personInfo: Object
  },
  computed: {
    birthday: function() {
      return `${this.personInfo.birthDate} ${
        MONTHS[this.personInfo.birthMonth - 1]
      }, ${this.personInfo.birthYear}`;
    },
    shortName: function() {
      return this.personInfo.nickname
        ? this.personInfo.nickname
        : this.personInfo.firstName;
    },
    name: function() {
      return `${this.personInfo.firstName} ${this.personInfo.lastName}`;
    },
    image: function() {
      return this.personInfo.image ? this.personInfo.image : DUMMY_IMG;
    }
  }
};
</script>
<style scoped>
.person {
  height: 300px;
  width: 300px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 2px solid #585cb2;
  font-size: 28px;
  background: black;
  color: white;
  font-family: TrebuchetMS;
  padding: 20px;
  margin: 20px;
  vertical-align: middle;
}

.person-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
}

img {
  width: 100%;
}

.person-name {
  margin: 5px;
}

.person-details {
  margin: 5px;
}
</style>