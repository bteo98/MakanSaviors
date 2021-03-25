<template>
    <md-card id="explore-card">
        <md-card-content>
            <div class="md-layout">
                <div class="md-layout-item">
                    <div>
                        <img
                            v-bind:src="imgRef"
                            v-bind:alt="description['name']"
                            class="rounded"
                            :class="{ 'responsive-image': responsive }"
                        />
                        <div class="text">
                            <small>Food Description:</small>
                            {{ description["name"] }}<br />
                            <small>Donor Name:</small>
                            {{
                                profile["firstName"].charAt(0).toUpperCase() +
                                    profile["firstName"]
                                        .slice(1)
                                        .toLowerCase() +
                                    " " +
                                    profile["lastName"]
                                        .charAt(0)
                                        .toUpperCase() +
                                    profile["lastName"].slice(1).toLowerCase()
                            }}<br />
                            <small>Collection Location:</small>
                            {{ profile["address"] }}<br />
                            <small>Quantity Avaliable:</small>
                            {{ description["quantity"] }}<br />
                            <small>Expiry Date:</small>
                            {{ description["expiryDate"].toLocaleString("en-US") }}
                        </div>
                    </div>
                </div>
            </div>
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
            //UID: "Nt2ExgrXaCcEj9SCn82pVqfZw6S2",
            //imgID: "lIO4s2eWOluIqeIMmQky",
            imgRef: "",
            description: {},
            profile: {},
            expiryDate: "",
            responsive: false,
        };
    },
    props: {
        UID: {type: String},
        imgID: {type: String}
    },
    methods: {
        fetchItems: function() {
            var storage = firebase.storage();
            let imgPath = storage.ref(
                this.UID + "/listingImages/" + this.imgID + ".jpg"
            );

            imgPath.getDownloadURL().then((url) => {
                this.imgRef = url;
                console.log(url);
            });

            var database = firebase.firestore();

            database
                .collection("users")
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
                .collection("imageData")
                .doc(this.imgID)
                .get()
                .then((items) => {
                    var data = {};

                    for (let [key, val] of Object.entries(items.data())) {
                        console.log(key + " " + val);
                        val =
                            key == "expiryDate" ? new Date(val.toDate()) : val;
                        data[key] = val;
                    }
                    this.description = data;
                    console.log(this.description);
                });
        },
        onResponsiveInverted() {
            if (window.innerWidth < 600) {
                this.responsive = true;
            } else {
                this.responsive = false;
            }
        },
    },
    created() {
        this.fetchItems();
    },
    mounted() {
        this.onResponsiveInverted();
        window.addEventListener("resize", this.onResponsiveInverted);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResponsiveInverted);
    },
};
</script>
<style scoped>
small,
div {
    font-size: medium;
}

img {
    display: inline-block;
    min-width: 95px;
    width: 20% !important;
    float: left;
    padding-top: 28px; 
}

.text {
    display: inline-block;
    max-width: 70%;
    padding: 26px 0;
    padding-left: 30px;
}

#explore-card {
    max-width: 500px !important;
    min-width: 420px !important;
}
</style>
