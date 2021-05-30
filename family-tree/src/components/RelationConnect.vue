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
      <button class="relate-btn" :disabled="!person1 || !person2" @click="relate">Relate!</button>
    </div>
    <div class="show-results">
      <FamilyTree
        class="related-tree"
        v-if="relatedPeople"
        :people="relatedPeople"
        :expanded="true"
      ></FamilyTree>
      <div v-else class="no-relation">⚠️ No Relation Found!</div>
    </div>
  </div>
</template>
<script>
import SelectBox from "./widgets/SelectBox";
import FamilyTree from "./FamilyTree";

export default {
  name: "RelationConnect",
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
      person1: null,
      person2: null,
      relatedPeople: null
    };
  },
  computed: {
    peopleOptions: function() {
      return this.allPeople
        .map(person => {
          return {
            personId: person.personId,
            fullName: `${person.firstName} ${person.lastName}`
          };
        })
        .sort((a, b) => a.fullName.localeCompare(b.fullName));
    }
  },
  methods: {
    savePerson1: function(val) {
      this.relatedPeople = null;
      this.person1 = val;
    },
    savePerson2: function(val) {
      this.relatedPeople = null;
      this.person2 = val;
    },
    relate: function() {
      this.relatedPeople = null;
      const person1 = this.people[this.person1.personId];
      const person2 = this.people[this.person2.personId];
      let relation = this.checkBasicRelation(person1, person2);
      if (!relation) {
        relation = this.checkDeeperRelation(person1, person2);
      }
      this.relatedPeople = relation;
      console.log(relation);
    },
    checkBasicRelation: function(person1, person2) {
      // Check himself
      if (person1.personId == person2.personId) {
        return this.personIDsToObject([person1.personId]);
      } else if (person1.personId == person2.father) {
        return this.personIDsToObject([person1.personId, person2.personId]);
      } else if (person1.personId == person2.mother) {
        return this.personIDsToObject([person1.personId, person2.personId]);
      } else if (person1.father == person2.personId || person1.mother == person2.personId) {
        return this.personIDsToObject([person1.personId, person2.personId]);
      }
      return "";
    },
    checkDeeperRelation: function(person1, person2) {
      const p1Data = this.getAllRelatives(person1);
      const p2Data = this.getAllRelatives(person2);

      for (let i = 0; i < p2Data.relatives.length; i++) {
        const personID = p2Data.relatives[i];
        const relIdx = p1Data.relatives.indexOf(personID);
        if (relIdx > -1) {
          const relIDs = p2Data.paths[i]
            .split(",")
            .concat(p1Data.paths[relIdx].split(","));

          return this.personIDsToObject(relIDs);
        }
      }
      return null;
    },
    getAllRelatives: function(person, relatives = [], currPath, paths = []) {
      let basePath = currPath ? currPath : `${person.personId}`;

      if (person.spouse && relatives.indexOf(person.spouse) == -1) {
        const currPath = `${basePath},${person.spouse}`;
        if (relatives.pushUnique(person.spouse)) {
          paths.pushUnique(currPath);
        }

        this.getAllRelatives(
          this.people[person.spouse],
          relatives,
          currPath,
          paths
        );
      }

      if (person.father) {
        const currPath = `${basePath},${person.father}`;
        if (relatives.pushUnique(person.father)) {
          paths.pushUnique(currPath);
        }

        this.getAllRelatives(
          this.people[person.father],
          relatives,
          currPath,
          paths
        );
      }

      if (person.mother) {
        const currPath = `${basePath},${person.mother}`;
        if (relatives.pushUnique(person.mother)) {
          paths.pushUnique(currPath);
        }

        this.getAllRelatives(
          this.people[person.mother],
          relatives,
          currPath,
          paths
        );
      }

      return { relatives, paths };
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

.relate-btn {
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

.relate-btn:active {
  -webkit-box-shadow: 0px 2px 0px #d35400;
  -moz-box-shadow: 0px 2px 0px #d35400;
  box-shadow: 0px 2px 0px #d35400;
  position: relative;
  top: 4px;
}

.relate-btn:disabled {
  -webkit-box-shadow: 0px 2px 0px #d35400;
  -moz-box-shadow: 0px 2px 0px #d35400;
  box-shadow: 0px 2px 0px #d35400;
  position: relative;
  top: 4px;
  opacity: 0.5;
}

.no-relation {
  font-size: 40px;
  padding: 40px;
  font-family: TrebuchetMS;
}
</style>