Feature: Mobile Bank Features
  A demo script with Crashken and cucumber

  Scenario: Realize a TED
    Given I logIn
		Then open menu and click on "Transferência"
		Then click on button text "Para contas DeviceBank"
		Then open menu and click on "Sair"
		Then press "Back"
		Then press "Home"

  Scenario: Realize a DOC
		Given I logIn
		Then open menu and click on "Transferência"
		Then click on button text "Para contas DeviceBank"
		Then open menu and click on "Sair"
		Then press "Back"
		Then press "Home"
