<template>
    <div class="wrapper">
        <parallax class="section header-filter" :style="headerStyle">
        </parallax>
        <div class="main main-raised">
            <div class="section">
                <div class="container">
                    <div class="md-layout">
                        <div class="md-layout-item">
                            <div class="title">
                                <h3>Request</h3>
                            </div>
                            <div>
                                <ul v-if="!processing" id="itemsList">
                                    <li
                                        class="md-layout"
                                        v-for="(item, index) in collections"
                                        :key="index"
                                    >
                                        <div
                                            class="md-layout"
                                            style="padding-right: 5%;"
                                        >
                                            <DonorCard
                                                class="md-layout-item donoarcard"
                                                :data="item"
                                            ></DonorCard>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <br /><br /><br />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "../firebase.js";
import DonorCard from "./components/DonorRequestCard";

export default {
    bodyClass: "quiz-lifestage-page",
    data() {
        return {
            collections: [],
            header: require("@/assets/img/city-profile.jpg"),
            processing: true,
            user: "r7e0ww5hcAPlEnLBfg4g8T8CTPJ2",
        };
    },
    components: {
        DonorCard,
    },
    computed: {
        headerStyle() {
            return {
                backgroundImage: `url(${this.header})`,
            };
        },
    },
    methods: {
        fetchItems: function() {
            var database = firebase.firestore();

            database
                .collection("donorRequest")
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        for (let [name, list] of Object.entries(doc.data())) {
                            this.collections[doc.id] = list;
                        }
                    });
                    this.processing = false;
                });
        },
    },
    mounted() {
        var self = this;
        var db = firebase.firestore();
        let collect = "donorRequest/" + this.user + "/foodDonated";
        console.log("hi");

        db.collection(collect)
            .orderBy("timeRequested", "asc")
            .onSnapshot((snapshot) => {
                this.collections = [];

                snapshot.forEach((doc) => {
                    let data = {};
                    data["foodID"] = doc.id;
                    doc = doc.data();
                    data["foodName"] = doc.foodName;
                    data["saviorID"] = doc.saviorID;
                    data["status"] = doc.status;
                    data["timeRequested"] = new Date(
                        doc.timeRequested.toDate().toLocaleString("en-US")
                    );
                    data["donorID"] = this.user;
                    this.collections.push(data);
                    console.log(this.collections);
                });
            });
    },
    created() {
        this.fetchItems();
    },
};
</script>

<style lang="scss" scoped>
donorcard {
    padding: 500px 500px !important;
}

ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li {
    flex-grow: 1;
    flex-basis: 300px;
    padding: 10px;
    margin: 10px;
}
</style>
