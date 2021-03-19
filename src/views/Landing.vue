<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Our Mission</h1>
            <h3>
              Share More, Save More, Waste Less.
            </h3>
            <h4>
              Whether you are a donor or a saviour, we can all do our part to reduce food waste in Singapore.
            </h4>
          </div>
            <img class="head" src="https://drjoeclarkblog.files.wordpress.com/2013/09/helping-hands.jpg"
            alt="Sharing Care" style="float: right; margin: 0px 0px 100px 100px;" width="300"/> 
          
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
          <div class="features text-center">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100" id="stories">
                <div id="feature">
                <h2>Featured Stories</h2>
                </div>
                <div class="feedback">
                  <div>
                    <img src="https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture.jpg" alt="User1" 
                    style="width:300px; height:300px; border-radius: 50%; border: 1px solid #ddd; height: 300px; width: 300px; 
                    padding: 5px; background-color: grey">
                  </div>
                  <br>
                  <p>
                    "Sharing food feels amazing! I love meeting different people
                    who come to pick pick-up my food and the interesting 
                    conversations that place on the doorstep" <br>-Elizabeth
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="feedback">
                  <div>
                    <img backgroud-image: src="https://expertphotography.com/wp-content/uploads/2020/08/social-media-profile-photos-9.jpg" 
                    alt="User2" style="border-radius: 50%; border: 1px solid #ddd; height: 300px; width: 300px; padding: 5px; background-color: grey"/>
                  </div>
                  <br>
                  <p>
                    "MakanSaviour brings people from all walks of life together, 
                    to achieve a common goal - to reduce food waste and build food 
                    sharing communities!" <br><br>-Claire
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="feedback">
                  <div>
                    <img src="https://www.over40datingsite.co.uk/wp-content/uploads/2016/09/shutterstock_341919467.jpg" alt="User3"
                    style="width:300px; height:300px; border-radius: 50%; border: 1px solid #ddd; height: 300px; width: 300px; 
                    padding: 5px; background-color: grey">
                  </div>
                  <br>
                  <p>
                    "Thanks to MakanSaviour, the unused food items at home did not
                    end up in the trash and are now with someone who needs them more"
                     <br><br>-Steven
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg7.jpg")
    },
    teamImg1: {
      type: String,
      default: require("@/assets/img/faces/avatar.jpg")
    },
    teamImg2: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    },
    teamImg3: {
      type: String,
      default: require("@/assets/img/faces/kendall.jpg")
    }
  },
  
  data() {
    return {
      reviews: []
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}

#feature {
text-align: left;
transform: rotate(-90deg);
position: absolute;
left: -90px;
margin-top: 100px;
}

#stories {
  margin-left: 50px
}

.feedback{
    max-width: 360px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
    //padding-right: 10px;
    background-color: rgb(236, 233, 233);
    min-width: auto;

}

</style>
