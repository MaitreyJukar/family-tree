<template>
  <div class="find-me">
    <div class="select-options">
      <SelectBox
        label="Search for"
        placeholder="Enter name"
        :options="peopleOptions"
        displayField="fullName"
        @valuechange="savePerson"
      ></SelectBox>
      <button class="find-btn" :disabled="!person" @click="findMe">Find Me!</button>
    </div>
    <div class="show-results">
      <FamilyTree
        class="related-tree"
        v-if="relatedPeople"
        :people="relatedPeople"
        :expanded="true"
      ></FamilyTree>
    </div>
  </div>
</template>
<script>
import SelectBox from "./widgets/SelectBox";
import FamilyTree from "./FamilyTree";

export default {
  name: "FindMe",
  components: {
    SelectBox,
    FamilyTree
  },
  props: {
    people: Object,
    allPeople: Array
  },
  data: function() {
    return {
      person: null,
      relatedPeople: null
    };
  },
  computed: {
    peopleOptions: function() {
      return this.allPeople
        .map(person => {
          return {
            id: person.id,
            fullName: `${person.firstName} ${person.lastName}`
          };
        })
        .sort((a, b) => a.fullName.localeCompare(b.fullName));
    }
  },
  methods: {
    savePerson: function(val) {
      this.relatedPeople = null;
      this.person = val;
    },
    findMe: function() {
      this.relatedPeople = null;
      const person = this.people[this.person.id];
      const relatives = this.getAllRelatives(person);
      this.relatedPeople = this.personIDsToObject([
        this.person.id,
        ...relatives
      ]);
    },
    getAllRelatives: function(person, relatives = []) {
      if (person.spouse && relatives.indexOf(person.spouse) == -1) {
        relatives.pushUnique(person.spouse);
        this.getAllRelatives(this.people[person.spouse], relatives);
      }

      if (person.father) {
        relatives.pushUnique(person.father);
        this.getAllRelatives(this.people[person.father], relatives);
      }

      if (person.mother) {
        relatives.pushUnique(person.mother);
        this.getAllRelatives(this.people[person.mother], relatives);
      }

      return relatives;
    },
    personIDsToObject: function(peopleIDs) {
      const people = {};
      for (var j = 0; j < peopleIDs.length; j++) {
        const pID = peopleIDs[j];
        const person = this.people[pID];
        people[pID] = person;
        if (person.spouse) {
          people[person.spouse] = this.people[person.spouse];
        }
      }
      return people;
    }
  }
};
</script>
<style>
.select-options {
  display: flex;
  align-items: center;
}

.select-group {
  display: flex;
  align-items: center;
  min-width: 300px;
  margin-right: 40px;
  padding: 20px;
  border: 2px solid #4caf50;
  border-radius: 10px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.12);
  background: #ceeeaa;
  font-family: TrebuchetMS;
}

.select {
  flex-grow: 1;
  margin-left: 20px;
}

.select-group .label {
  text-transform: uppercase;
}

.find-btn {
  position: relative;
  width: auto;
  color: black;
  text-decoration: none;
  border-radius: 5px;
  border: solid 1px #f39c12;
  background: #e67e22;
  text-align: center;
  padding: 16px 18px 14px;
  cursor: pointer;

  -webkit-transition: all 0.1s;
  -moz-transition: all 0.1s;
  transition: all 0.1s;

  -webkit-box-shadow: 0px 6px 0px #d35400;
  -moz-box-shadow: 0px 6px 0px #d35400;
  box-shadow: 0px 6px 0px #d35400;
}

.find-btn:active {
  -webkit-box-shadow: 0px 2px 0px #d35400;
  -moz-box-shadow: 0px 2px 0px #d35400;
  box-shadow: 0px 2px 0px #d35400;
  position: relative;
  top: 4px;
}

.find-btn:disabled {
  -webkit-box-shadow: 0px 2px 0px #d35400;
  -moz-box-shadow: 0px 2px 0px #d35400;
  box-shadow: 0px 2px 0px #d35400;
  position: relative;
  top: 4px;
  opacity: 0.5;
}
</style>