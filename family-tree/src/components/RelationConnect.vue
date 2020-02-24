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
      <FamilyTree
        class="related-tree"
        v-if="relatedPeople"
        :people="relatedPeople"
        :expanded="true"
      ></FamilyTree>
      <div v-else class="no-relation">No Relation Found!</div>
    </div>
  </div>
</template>
<script>
import SelectBox from "./widgets/SelectBox";
import FamilyTree from "./FamilyTree";
// const RELATIONS = {
//   SELF: "Seriously? 😒"
// };

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
      this.relatedPeople = null;
      this.person1 = val;
    },
    savePerson2: function(val) {
      this.relatedPeople = null;
      this.person2 = val;
    },
    relate: function() {
      this.relatedPeople = null;
      const person1 = this.people[this.person1.id];
      const person2 = this.people[this.person2.id];
      let relation = this.checkBasicRelation(person1, person2);
      if (!relation) {
        relation = this.checkDeeperRelation(person1, person2);
      }
      this.relatedPeople = relation;
      console.log(relation);
    },
    checkBasicRelation: function(person1, person2) {
      // Check himself
      if (person1.id == person2.id) {
        return this.personIDsToObject([person1.id]);
      } else if (person1.id == person2.father) {
        return this.personIDsToObject([person1.id, person2.id]);
      } else if (person1.id == person2.mother) {
        return this.personIDsToObject([person1.id, person2.id]);
      } else if (person1.father == person2.id || person1.mother == person2.id) {
        return this.personIDsToObject([person1.id, person2.id]);
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
      let basePath = currPath ? currPath : `${person.id}`;

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