<template>
  <div
    class="person"
    :class="gender"
    v-tooltip="{
								content: personInfo.personId,
								placement: 'top'
							}"
  >
    <div class="person-image">
      <img :src="image" />
    </div>
    <div class="person-name">
      <div>{{personInfo.firstName}}</div>
      <div>{{personInfo.lastName}}</div>
    </div>
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
  height: 100px;
  width: 100px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 12px;
  font-family: TrebuchetMS;
  padding: 5px;
  margin: 10px;
  vertical-align: middle;
  box-shadow: 3px 3px 5px 6px #ccc;
}

.person.male {
  border: 5px solid rgb(0, 198, 255);
}

.person.female {
  border: 5px solid rgb(157, 80, 187);
}

.person-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  display: none;
}

img {
  width: 100%;
}

.person-name {
  margin: 5px;
  font-size: 12px;
  text-align: center;
}

.person-details {
  margin: 5px;
  font-size: 10px;
  text-align: center;
}
</style>