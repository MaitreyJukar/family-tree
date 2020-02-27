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
      <button
        class="header-button find"
        :class="{'active': currentApp == 'find'}"
        @click="currentApp = 'find'"
      >
        <IconSearch />
      </button>
    </div>
    <template v-if="initialized">
      <FamilyTree class="family-tree" :people="people" v-if="currentApp=='tree'"></FamilyTree>
      <FamilyTable class="family-table" :people="allData" v-if="currentApp=='table'"></FamilyTable>
      <RelationConnect
        class="family-connect"
        :people="people"
        :allPeople="allData"
        v-if="currentApp=='connect'"
      ></RelationConnect>
      <FindMe
        class="family-find-me"
        :people="people"
        :allPeople="allData"
        v-if="currentApp=='find'"
      ></FindMe>
    </template>
  </div>
</template>

<script>
import FamilyTable from "./components/FamilyTable";
import FamilyTree from "./components/FamilyTree";
import FindMe from "./components/FindMe";
import RelationConnect from "./components/RelationConnect";
import axios from "axios";
import IconTable from "./components/icons/IconTable";
import IconTree from "./components/icons/IconTree";
import IconConnect from "./components/icons/IconConnect";
import IconSearch from "./components/icons/IconSearch";

export default {
  name: "App",
  components: {
    FamilyTable,
    FamilyTree,
    RelationConnect,
    FindMe,
    IconTable,
    IconTree,
    IconConnect,
    IconSearch
  },
  data: function() {
    return {
      allData: [],
      people: {},
      currentApp: "table",
      initialized: false
    };
  },
  mounted() {
    axios
      .get(
        "https://v2-api.sheety.co/6969442d9e95310b90a6eb3a9ca14fa3/familyTree/person"
      )
      .then(response => {
        this.allData = response.data.person;
        this.parsePeople(this.allData);
        this.initialized = true;
      });
  },
  methods: {
    parsePeople: function(people) {
      const peopleMap = {};
      for (let i = 0; i < people.length; i++) {
        const person = people[i];
        peopleMap[person.id] = person;
      }
      this.people = peopleMap;
    }
  }
};
</script>

<style>
#app {
  padding-left: 40px;
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
