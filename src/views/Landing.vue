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
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <h2 id="feature">Featured Stories</h2>
                <div class="info">
                  <div>
                    <img src="https://6.viki.io/image/ec510dd2def049c79c0ab79780b5ca65.jpeg?s=900x600&e=t" alt="User1" 
                    style="width:300px; height:300px; border-radius: 50%; border: 1px solid #ddd; height: 300px; width: 300px; 
                    padding: 5px; background-color: grey">
                  </div>
                  <br>
                  <p>
                    "Sharing food feels amazing! I love meeting different people
                    who come to pick pick-up my food and the interesting 
                    conversations that place on the doorstep" -Elizabeth
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div>
                    <img backgroud-image: src="https://external-preview.redd.it/gMpJIuCGYpV8VgnnkIG4Utb3bqwpiYJ4Xs2nTnNh1RE.jpg?auto=webp&s=face729cd32341f39ac53a237aa0f4e5ae297456" 
                    alt="User2" style="border-radius: 50%; border: 1px solid #ddd; height: 300px; width: 300px; padding: 5px; background-color: grey"/>
                  </div>
                  <br>
                  <p>
                    "MakanSaviour brings people from all walks of life together, 
                    to achieve a common goal - to reduce food waste and build food 
                    sharing communities!" -Claire
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div>
                    <img src="https://www.whitehouse.gov/wp-content/uploads/2021/01/45_donald_trump.jpg" alt="User3"
                    style="width:300px; height:300px; border-radius: 50%; border: 1px solid #ddd; height: 300px; width: 300px; 
                    padding: 5px; background-color: grey">
                  </div>
                  <br>
                  <p>
                    "Thanks to MakanSaviour, the unused food items at home did not
                    end up in the trash and are now with someone who needs them more"
                     -Steven
                  </p>
                </div>
              </div>
              <!--<h3 v-show="item.show">{{item.review}}</h3>-->
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
</style>
