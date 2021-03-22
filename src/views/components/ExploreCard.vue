<template>
    <md-card>
        <md-card-content>
            <img v-bind:src="imgRef" v-bind:alt="description['name']">
            <p>
                Food Description: {{description['name']}}<br>
                Donor Name: {{
                    profile['firstName'].charAt(0).toUpperCase() 
                        + profile['firstName'].slice(1).toLowerCase() 
                        + " " + profile['lastName'].charAt(0).toUpperCase()
                        + profile['lastName'].slice(1).toLowerCase()}}<br>
                Collection Location: {{}}<br>
                Quantity Avaliable: {{description["quantity"]}}<br>
                Expiry Date: {{description['expiryDate']}}
            </p>
            <slot name="content"></slot>
        </md-card-content>
    </md-card>
</template>

<script>
import firebase from "../../firebase";

export default {
    name: "explore-card",
    data() {
        return {
            UID: "1XSR7CKQnQR92zI1FGf7ajhqWo13",
            imgID: "lIO4s2eWOluIqeIMmQky",
            imgRef: "",
            description: {},
            profile: {},
            expiryDate: "",
        };
    },
    methods: {
        fetchItems: function() {
            var storage = firebase.storage();
            let imgPath = storage.ref(
                this.UID + "/listingImages/" + this.imgID + ".jpg"
            );

            imgPath.getDownloadURL().then((url) => {
                this.imgRef = url;
            });

            var database = firebase.firestore();

            database
                .collection('users')
                .doc(this.UID)
                .get()
                .then((items) => {
                    var data = {};

                    for (let [key, val] of Object.entries(items.data())) {
                        data[key] = val;
                    }
                    this.profile = data;
                    console.log(this.profile);
                });

            database
                .collection(this.UID)
                .doc(this.imgID)
                .get()
                .then((items) => {
                    var data = {};

                    for (let [key, val] of Object.entries(items.data())) {
                        console.log(key + " " + val);
                        val = key == "expiryDate" ?
                            new Date(val.toDate()) : val;
                        data[key] = val;
                    }
                    this.description = data;
                });
        },
    },
    created() {
        this.fetchItems();
    },
};
</script>
