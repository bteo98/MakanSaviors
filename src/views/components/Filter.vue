<template>
<div>
    <strong>Filter By</strong>
    <div>
        <p>Location</p>
        <div class="flex-column">
            <md-checkbox id="box1" v-model="checkedBox">East</md-checkbox> <span>
            <md-checkbox id="box2" v-model="checkedBox">North</md-checkbox> </span><br>
            <md-checkbox id="box3" v-model="checkedBox">South</md-checkbox> <span>
            <md-checkbox id="box3" v-model="checkedBox">West</md-checkbox> </span><br>
            <md-checkbox id="box4" v-model="checkedBox">Central</md-checkbox>
            {{checkedBox}}
        </div>
    </div>
</div>
</template>


<script>
/*
import firebase from "../../firebase";

export default {
    name: "filter",
    data() {
        return {
            checkedBox: []
        }
    },
    
    watch: {
        checkbox1: 'insertInput("East")',
        checkbox2: 'insertInput("North")',
        checkbox3: 'insertInput("South")',
        checkbox4: 'insertInput("West")',
        checkbox5: 'insertInput("Central")'
    },
    methods: {
        locationFilter: function() {
            var database = firebase.firestore().ref("donationData/");
            ref.orderByChild("collectionLocation").equalTo(this.input)
            .on("child_added", function(snapshot) {
                console.log(snapshot.val().collectionLocation);
            })      
        }
        
        insertInput: function(location) {
            this.input = location;
        },
        checkInput: function() {
            console.log(this.input)
        }
        
    },
    created() {
        this.fetchItems();
  }

}*/
</script>

