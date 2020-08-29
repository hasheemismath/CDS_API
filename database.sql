CREATE DATABASE cds;

create table admin(
    admin_id SERIAL PRIMARY KEY,
    password VARCHAR(20)
);

create table client(
    id SERIAL PRIMARY KEY,
    Client_ac_No VARCHAR(30),
    Client_Name VARCHAR(255),
    Advisor_Code VARCHAR(255),
    Address1 VARCHAR(255),
    Address2 VARCHAR(255),
    Address3 VARCHAR(255),
    Town VARCHAR(255),
    Country VARCHAR(255),
    Email VARCHAR(255),
    Telephone VARCHAR(255),
    Mobile VARCHAR(255),
    Registered_Date VARCHAR(255),
    Custodial_Accounts VARCHAR(255),
    Client_Margin_Provider VARCHAR(255),
    Last_Trade_Date VARCHAR(255),
    Portfolio_Balance VARCHAR(255),
    Account_Balance VARCHAR(255)
);