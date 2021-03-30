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
                            <div class="md-layout">
                                <div class="md-layout-item md-small-size-100">
                                    <tabs
                                        :tab-name="['Donor', 'Savior']"
                                        :tab-icon="['dashboard', 'schedule']"
                                        plain
                                        flex-column
                                        nav-pills-icons
                                        color-button="success"
                                    >
                                        <!-- here you can add your content for tab-content -->
                                        <template slot="tab-pane-1">
                                            <div>
                                                <ul
                                                    v-if="!processing"
                                                    id="itemsList"
                                                >
                                                    <li
                                                        class="md-layout"
                                                        v-for="(item,
                                                        index) in collections"
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
                                        </template>
                                        <template slot="tab-pane-2">
                                            Efficiently unleash cross-media
                                            information without cross-media
                                            value. Quickly maximize timely
                                            deliverables for real-time schemas.
                                            <br /><br />
                                            Dramatically maintain
                                            clicks-and-mortar solutions without
                                            functional solutions.
                                        </template>
                                    </tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br /><br />
                </div>
            </div>
        </div>
        <button style="border: none;">
            <i class="material-icons" id="up-button">arrow_circle_up</i>
        </button>
    </div>
</template>

<script>
import firebase from "../firebase.js";
import DonorCard from "./components/DonorRequestCard";
import { Tabs } from "@/components";

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
        Tabs,
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
        liveFetch: function() {
            var db = firebase.firestore();
            let collect = "donorRequest/" + this.user + "/foodDonated";

            db.collection(collect)
                .orderBy("timeRequested", "desc")
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
        topFunction() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        scrollFunction() {
            if (
                document.body.scrollTop > 20 ||
                document.documentElement.scrollTop > 20
            ) {
                upbutton.style.display = "block";
            } else {
                upbutton.style.display = "none";
            }
        }
    },
    mounted() {
        this.liveFetch();
        //Get the button:
        upbutton = document.getElementById("up-button");

        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = function() {
            scrollFunction();
        };
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

// button does not work
#up-button {
    font-size: 37px;
    display: none; /* Hidden by default */
    position: fixed; /* Fixed/sticky position */
    bottom: 20px; /* Place the button at the bottom of the page */
    right: 30px; /* Place the button 30px from the right */
    z-index: 99; /* Make sure it does not overlap */
    border: none; /* Remove borders */
    outline: none; /* Remove outline */
    color: white; /* Text color */
    cursor: pointer; /* Add a mouse pointer on hover */
    padding: 15px; /* Some padding */
}

#myBtn:hover {
    background-color: #555; /* Add a dark-grey background on hover */
}
</style>
