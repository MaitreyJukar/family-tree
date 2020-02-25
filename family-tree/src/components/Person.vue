<template>
  <div class="person" :class="gender">
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
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
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
    },
    gender: function() {
      return this.personInfo.gender ? this.personInfo.gender.toLowerCase() : "";
    }
  }
};
</script>
<style scoped>
.person {
  height: 170px;
  width: 120px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: black;
  font-size: 12px;
  color: white;
  font-family: TrebuchetMS;
  padding: 20px;
  margin: 20px;
  vertical-align: middle;
  box-shadow: 3px 3px 5px 6px #ccc;
}

.person.male {
  background: linear-gradient(to bottom, rgb(0, 198, 255), rgb(0, 114, 255));
}

.person.female {
  background: linear-gradient(to bottom, rgb(157, 80, 187), rgb(110, 72, 170));
}

.person-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
}

img {
  width: 100%;
}

.person-name {
  margin: 5px;
  font-size: 12px;
}

.person-details {
  margin: 5px;
  font-size: 10px;
}
</style>