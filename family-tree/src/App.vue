<template>
  <div id="app">
    <div class="header">
      <button
        class="header-button tree"
        :class="{'active': currentApp == 'tree'}"
        @click="currentApp = 'tree'"
      >
        <IconTree />
      </button>
      <button
        class="header-button table"
        :class="{'active': currentApp == 'table'}"
        @click="currentApp = 'table'"
      >
        <IconTable />
      </button>
      <button
        class="header-button connect"
        :class="{'active': currentApp == 'connect'}"
        @click="currentApp = 'connect'"
      >
        <IconConnect />
      </button>
    </div>
    <div class="family" v-if="currentApp=='tree'">
      <Relation
        v-for="(relation, idx) in family"
        :key="idx"
        :people="relation.people"
        :children="relation.children"
      />
    </div>
    <FamilyTable class="family-table" :people="allData" v-if="currentApp=='table'" />
    <RelationConnect
      v-if="currentApp=='connect'"
      :relations="relations"
      :relationMap="relationMap"
      :people="people"
      :allPeople="allData"
    ></RelationConnect>
  </div>
</template>

<script>
import Relation from "./components/Relation";
import FamilyTable from "./components/FamilyTable";
import RelationConnect from "./components/RelationConnect";
import axios from "axios";
import IconTable from "./components/icons/IconTable";
import IconTree from "./components/icons/IconTree";
import IconConnect from "./components/icons/IconConnect";

export default {
  name: "App",
  components: {
    Relation,
    FamilyTable,
    RelationConnect,
    IconTable,
    IconTree,
    IconConnect
  },
  data: function() {
    return {
      allData: [],
      family: [],
      relations: [],
      people: {},
      relationMap: {},
      pendingParents: {},
      currentApp: "table"
    };
  },
  mounted() {
    axios
      .get(
        "https://v2-api.sheety.co/6969442d9e95310b90a6eb3a9ca14fa3/familyTree/person"
      )
      .then(response => {
        this.allData = response.data.person;
        this.parseRelations(response.data.person);
      });
  },
  methods: {
    parseRelations: function(people) {
      const family = [];
      for (let i = 0; i < people.length; i++) {
        const person = people[i];
        this.people[person.id] = person;
        // Add to relation
        if (person.spouse && this.people[person.spouse]) {
          const relationshipIdx = this.relationMap[person.spouse];
          this.relations[relationshipIdx].people.push(person);
          this.relationMap[person.id] = relationshipIdx;
        }
        // Create relation
        else {
          this.relationMap[person.id] = this.relations.length;
          this.relations.push({
            people: [person]
          });
        }
        const relIdx = this.relationMap[person.id];
        const relation = this.relations[relIdx];

        // Add to parent
        if (person.father || person.mother) {
          if (this.people[person.father]) {
            const parentRelIdx = this.relationMap[person.father];
            this.relations[parentRelIdx].children =
              this.relations[parentRelIdx].children || [];
            this.relations[parentRelIdx].children.push(relation);
          } else if (this.people[person.mother]) {
            const parentRelIdx = this.relationMap[person.mother];
            this.relations[parentRelIdx].children =
              this.relations[parentRelIdx].children || [];
            this.relations[parentRelIdx].children.push(relation);
          } else {
            if (person.father) {
              this.pendingParents[person.father] =
                this.pendingParents[person.father] || [];
              this.pendingParents[person.father].push(person.id);
            }
            if (person.mother) {
              this.pendingParents[person.mother] =
                this.pendingParents[person.mother] || [];
              this.pendingParents[person.mother].push(person.id);
            }
          }
        } else {
          if (family.indexOf(relation) == -1) {
            family.push(relation);
          }
        }

        // Clean pending parents
        if (Object.keys(this.pendingParents).indexOf("" + person.id) > -1) {
          relation.children = relation.children || [];
          const currentParent = this.pendingParents[person.id];
          for (let i = 0; i < currentParent.length; i++) {
            const currChildRelIdx = this.relationMap[currentParent[i]];
            if (
              relation.children.indexOf(this.relations[currChildRelIdx]) == -1
            ) {
              relation.children.push(this.relations[currChildRelIdx]);
            }
          }
          delete this.pendingParents[person.id];
        }
      }

      this.family = family.filter(
        rel =>
          !rel.people.filter(person => person.father || person.mother).length
      );
    }
  }
};
</script>

<style>
#app {
  padding-left: 40px;
}
.family {
  display: flex;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  z-index: 0;
  margin: 0 auto;
  background-color: #2c2c2c;
  flex-direction: column;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
}

.header-button {
  background: none;
  border: none;
  margin: 5px;
  cursor: pointer;
  height: 40px;
}

.header-button:hover {
  background: #888;
}

.header-button.active {
  background: #666;
}
</style>
