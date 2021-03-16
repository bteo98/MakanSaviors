<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Let us know you better!</h1>
            <h4>
              You are just a step away from creating your MakanSaviour account.
            </h4>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="features text-center">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <h2 class="info-title">Add a profile picture</h2>
                  <div class="icon icon-info">
                    <img
                    :src="profile"
                    alt="Rounded Image"
                    class="img-raised rounded img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">Personal Information</h2>
              <form class="contact-form">
                <div class="md-layout">

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>First Name</label>
                      <md-input v-model="firstName" type="text" required></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Last Name</label>
                      <md-input v-model="lastName" type="text" required></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Phone Number</label>
                      <md-input v-model="phoneNumber" type="number" required></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Telegram Handle</label>
                      <md-input v-model="telegramHandle" type="text" required></md-input>
                    </md-field>
                  </div>

                </div>

                <md-field maxlength="5">
                  <label>Address</label>
                  <md-textarea v-model="address" required></md-textarea>
                </md-field>

              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">Additional Information</h2>
              <form class="contact-form">
                <div class="md-layout">

                  <div class="md-layout-item md-size-50">
                    <md-input-container>
                      <label>Dietary Restriction(s)</label>
                      <md-select v-model="dietaryRestrictions" multiple>
                        <md-option value="none">None</md-option>
                        <md-option value="diabetic">Diabetic</md-option>
                        <md-option value="glutenFree">Gluten Free</md-option>
                        <md-option value="halal">Halal</md-option>
                        <md-option value="kosher">Kosher</md-option>
                        <md-option value="lactoseIntolerance">Lactose Intolerance</md-option>
                        <md-option value="peanutAllergy">Peanut Allergies</md-option>
                        <md-option value="vegetarian">Vegetarian</md-option>
                        <md-option value="others">Others</md-option>
                      </md-select>
                    </md-input-container>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-input-container>
                      <label>Top 3 Food Categories</label>
                      <md-select v-model="foodCategory" multiple>
                        <md-option value="bakingNeeds">Baking Needs</md-option>
                        <md-option value="biscuits">Biscuits</md-option>
                        <md-option value="buffet">Buffet/Bento Boxes</md-option>
                        <md-option value="canned">Canned Food</md-option>
                        <md-option value="dairy">Dairy, Chilled, Eggs</md-option>
                        <md-option value="drinks">Drinks</md-option>
                        <md-option value="frozen">Frozen Food</md-option>
                        <md-option value="fruits">Fruits</md-option>
                        <md-option value="meat">Meat, Seafood</md-option>
                        <md-option value="rice">Rice, Noodles</md-option>
                        <md-option value="seasonings">Seasonings</md-option>
                        <md-option value="vegetables">Vegetables</md-option>
                        <md-option value="others">Others</md-option>
                      </md-select>
                    </md-input-container>
                  </div>

                </div>

                <md-field maxlength="5">
                  <label>Reason to Donate</label>
                  <md-textarea v-model="reasonDonate"></md-textarea>
                </md-field>

                <md-field maxlength="5">
                  <label>Reason to Save</label>
                  <md-textarea v-model="reasonSave"></md-textarea>
                </md-field>

                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button class="md-success">Create Account</md-button>
                  </div>
                </div>
              </form>
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
    profile: {
      type: String,
      default: require("@/assets/img/faces/avatar.jpg")
    }
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      phoneNumber: null,
      telegramHandle: null,
      address: null,
      dietaryRestrictions: null,
      foodCategory: null,
      reasonDonate: null,
      reasonSave: null,
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
.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>
