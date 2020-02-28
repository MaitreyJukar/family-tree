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

/** Tooltip Styles */

.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}

/** */
</style>
