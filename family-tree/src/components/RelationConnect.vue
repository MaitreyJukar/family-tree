<template>
  <div class="relation-connect">
    <div class="select-options">
      <SelectBox
        label="Person 1"
        placeholder="Enter name"
        :options="peopleOptions"
        displayField="fullName"
        @valuechange="savePerson1"
      ></SelectBox>
      <SelectBox
        label="Person 2"
        placeholder="Enter name"
        :options="peopleOptions"
        displayField="fullName"
        @valuechange="savePerson2"
      ></SelectBox>
      <button :disabled="!person1 || !person2" @click="relate">Relate!</button>
    </div>
    <div class="show-results">
      <div class="no-relation">No Relation Found!</div>
      <div class="relation"></div>
    </div>
  </div>
</template>
<script>
import SelectBox from "./widgets/SelectBox";
const RELATIONS = {
  SELF: "Seriously? 😒"
};

export default {
  name: "RelationConnect",
  components: {
    SelectBox
  },
  props: {
    relations: Array,
    relationMap: Object,
    people: Object,
    allPeople: Array
  },
  data: function() {
    return {
      person1: null,
      person2: null
    };
  },
  computed: {
    peopleOptions: function() {
      return this.allPeople.map(person => {
        return {
          id: person.id,
          fullName: `${person.firstName} ${person.lastName}`
        };
      });
    }
  },
  methods: {
    savePerson1: function(val) {
      this.person1 = val;
    },
    savePerson2: function(val) {
      this.person2 = val;
    },
    relate: function() {
      const person1 = this.people[this.person1.id];
      const person2 = this.people[this.person2.id];
      let relation = this.checkBasicRelation(person1, person2);
      if (!relation) {
        this.checkDeeperRelation(person1, person2);
      }
    },
    checkBasicRelation: function(person1, person2) {
      // Check himself
      if (person1.id == person2.id) {
        return "SELF";
      } else if (person1.id == person2.father) {
        return "FATHER";
      } else if (person1.id == person2.mother) {
        return "MOTHER";
      } else if (person1.father == person2.id || person1.mother == person2.id) {
        return person2.gender == "Male" ? "SON" : "DAUGHTER";
      }
      return "";
    },
    checkDeeperRelation: function(person1, person2) {
      const p1Relatives = this.getAllRelatives(person1);
      
    },
    getAllRelatives: function(person, relatives = []) {
      if (person.father) {
        relatives.pushUnique(person.father);
        this.getAllRelatives(this.people[person.father], relatives);
      }
      if (person.mother) {
        relatives.pushUnique(person.mother);
        this.getAllRelatives(this.people[person.mother], relatives);
      }
      if (person.spouse) {
        relatives.pushUnique(person.spouse);
        this.getAllRelatives(this.people[person.spouse], relatives);
      }
      return relatives;
    }
  }
};
</script>