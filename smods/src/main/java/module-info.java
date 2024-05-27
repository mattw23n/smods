module com.smods.backend {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.smods.backend to javafx.fxml;
    exports com.smods.backend;
}