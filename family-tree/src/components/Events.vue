<template>
  <div class="events">
    <table class="event-table">
      <thead>
        <tr>
          <th scope="col">Person</th>
          <th scope="col">Event Type</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, idx) in events" :key="idx">
          <td>{{ value.person }}</td>
          <td>{{ value.type }}</td>
          <td>{{ displayDate(value) }}</td>
        </tr>
      </tbody>
    </table>
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

const EVENT_TYPES = {
  BDAY: "Birthday",
  ANNV: "Anniversary"
};

export default {
  name: "Events",
  props: {
    people: Array,
    peopleMap: Object,
    anniversaries: Array
  },
  data: function() {
    return {
      events: []
    };
  },
  mounted: function() {
    this.computeEvents();
  },
  methods: {
    computeEvents: function() {
      const birthdays = this.getBirthdayEvents();
      const anniversaries = this.getAnniversaryEvents();
      this.events = this.sortEvents(birthdays.concat(anniversaries));
    },
    getBirthdayEvents: function() {
      const birthdays = [];
      for (let i = 0; i < this.people.length; i++) {
        const person = this.people[i];
        if (person.birthDate && person.birthMonth && person.birthYear) {
          birthdays.push({
            person: `${person.firstName} ${person.lastName}`,
            type: EVENT_TYPES.BDAY,
            day: +person.birthDate,
            month: +person.birthMonth,
            year: +person.birthYear
          });
        }
      }
      return birthdays;
    },
    getAnniversaryEvents: function() {
      const anniversaries = [];
      for (let i = 0; i < this.anniversaries.length; i++) {
        const event = this.anniversaries[i];
        if (
          event.anniversaryDate &&
          event.anniversaryMonth &&
          event.anniversaryYear
        ) {
          const person1 = this.peopleMap[event.person1];
          const person2 = this.peopleMap[event.person2];
          anniversaries.push({
            person: `${person1.firstName} ${person1.lastName} & ${person2.firstName} ${person2.lastName}`,
            type: EVENT_TYPES.ANNV,
            day: +event.anniversaryDate,
            month: +event.anniversaryMonth,
            year: +event.anniversaryYear
          });
        }
      }
      return anniversaries;
    },
    sortEvents: function(events) {
      return events.sort((a, b) => {
        if (a.month > b.month) {
          return 1;
        } else if (a.month < b.month) {
          return -1;
        } else if (a.day > b.day) {
          return 1;
        } else if (a.day < b.day) {
          return -1;
        }
        return 0;
      });
    },
    displayDate: function(person) {
      return `${person.day} ${MONTHS[person.month - 1]} ${person.year}`;
    }
  }
};
</script>
<style scoped>
th,
td {
  padding: 10px 40px;
  border: 1px solid #000;
  font-size: 20px;
  font-family: TrebuchetMS;
  text-align: center;
}

table {
  border-collapse: collapse;
}

thead {
  background: #ea6152;
  text-transform: uppercase;
}
</style>