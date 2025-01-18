describe("User should be able to", () => {
  it("view current location", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
          (successCallback) => {
            successCallback({
              coords: {
                latitude: 60.391, // Example latitude
                longitude: 5.325, // Example longitude
                accuracy: 0.9,
              },
            });
          }
        );
      },
    });
    cy.getByTestId("location").should("have.text", "Bergen");
    cy.getByTestId("search-button").click();
    cy.getByTestId("search-input").type("Bibrka", { delay: 500 });
    cy.getByTestId("city-card").first().click();
    cy.getByTestId("location").should("have.text", "Bibrka");
    cy.getByTestId("hourly-forecast").should("have.length", 24);
    cy.getByTestId("daily-forecast").should("have.length", 3);
    cy.getByTestId("hour").first().should("have.text", new Date().getHours());
  });
});
