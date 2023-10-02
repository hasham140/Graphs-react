/* eslint-disable max-classes-per-file */
// eslint-disable-line no-console
import us from "./country.json";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { useState } from "react";
import * as topojson from "topojson";

const labels = ["low", "", "high"];
const states = new Map(
  us.objects.states.geometries.map((d) => [d.id, d.properties])
);

const colors = [
  "#e8e8e8",
  "#ace4e4",
  "#5ac8c8",
  "#dfb0d6",
  "#a5add3",
  "#5698b9",
  "#be64ac",
  "#8c62aa",
  "#3b4994",
];
const n = Math.floor(Math.sqrt(colors.length));

const SimpleTreemap = () => {
  const data = [
    {
      county: "01001",
      diabetes: 8.1,
      obesity: 30.5,
    },
    {
      county: "01003",
      diabetes: 8.7,
      obesity: 29.2,
    },
    {
      county: "01005",
      diabetes: 9.8,
      obesity: 30.3,
    },
    {
      county: "01007",
      diabetes: 8.7,
      obesity: 30.6,
    },
    {
      county: "01009",
      diabetes: 9.6,
      obesity: 27.9,
    },
    {
      county: "01011",
      diabetes: 8.3,
      obesity: 18.4,
    },
    {
      county: "01013",
      diabetes: 12.1,
      obesity: 29.3,
    },
    {
      county: "01015",
      diabetes: 13.9,
      obesity: 35.7,
    },
    {
      county: "01017",
      diabetes: 10.4,
      obesity: 30,
    },
    {
      county: "01019",
      diabetes: 9.5,
      obesity: 27.9,
    },
    {
      county: "01021",
      diabetes: 9.5,
      obesity: 36.1,
    },
    {
      county: "01023",
      diabetes: 10.8,
      obesity: 28.4,
    },
    {
      county: "01025",
      diabetes: 10.5,
      obesity: 32.2,
    },
    {
      county: "01027",
      diabetes: 7.5,
      obesity: 23.5,
    },
    {
      county: "01029",
      diabetes: 7.3,
      obesity: 23.7,
    },
    {
      county: "01031",
      diabetes: 10.2,
      obesity: 35.3,
    },
    {
      county: "01033",
      diabetes: 9.3,
      obesity: 30.6,
    },
    {
      county: "01035",
      diabetes: 9.9,
      obesity: 23.3,
    },
    {
      county: "01037",
      diabetes: 8.2,
      obesity: 21.6,
    },
    {
      county: "01039",
      diabetes: 11.8,
      obesity: 37.8,
    },
    {
      county: "01041",
      diabetes: 10.3,
      obesity: 26.1,
    },
    {
      county: "01043",
      diabetes: 10.3,
      obesity: 31.7,
    },
    {
      county: "01045",
      diabetes: 13.6,
      obesity: 35.1,
    },
    {
      county: "01047",
      diabetes: 13.1,
      obesity: 40.4,
    },
    {
      county: "01049",
      diabetes: 9.6,
      obesity: 34.9,
    },
    {
      county: "01051",
      diabetes: 12,
      obesity: 34.1,
    },
    {
      county: "01053",
      diabetes: 13.8,
      obesity: 32.7,
    },
    {
      county: "01055",
      diabetes: 13.7,
      obesity: 35.7,
    },
    {
      county: "01057",
      diabetes: 8,
      obesity: 25.3,
    },
    {
      county: "01059",
      diabetes: 8.1,
      obesity: 21.1,
    },
    {
      county: "01061",
      diabetes: 11.8,
      obesity: 29.8,
    },
    {
      county: "01063",
      diabetes: 9.5,
      obesity: 20.6,
    },
    {
      county: "01065",
      diabetes: 11,
      obesity: 30.6,
    },
    {
      county: "01067",
      diabetes: 8.9,
      obesity: 29.4,
    },
    {
      county: "01069",
      diabetes: 11.2,
      obesity: 36.1,
    },
    {
      county: "01071",
      diabetes: 9.3,
      obesity: 35.6,
    },
    {
      county: "01073",
      diabetes: 11.8,
      obesity: 35.1,
    },
    {
      county: "01075",
      diabetes: 9.6,
      obesity: 24.6,
    },
    {
      county: "01077",
      diabetes: 10.2,
      obesity: 33.1,
    },
    {
      county: "01079",
      diabetes: 9.2,
      obesity: 22.6,
    },
    {
      county: "01081",
      diabetes: 10.1,
      obesity: 30.6,
    },
    {
      county: "01083",
      diabetes: 7.5,
      obesity: 26.6,
    },
    {
      county: "01085",
      diabetes: 10,
      obesity: 23.9,
    },
    {
      county: "01087",
      diabetes: 13.8,
      obesity: 23.2,
    },
    {
      county: "01089",
      diabetes: 11,
      obesity: 30.7,
    },
    {
      county: "01091",
      diabetes: 12.4,
      obesity: 36.3,
    },
    {
      county: "01093",
      diabetes: 8.5,
      obesity: 24.8,
    },
    {
      county: "01095",
      diabetes: 10.5,
      obesity: 37.7,
    },
    {
      county: "01097",
      diabetes: 12.6,
      obesity: 37.4,
    },
    {
      county: "01099",
      diabetes: 10,
      obesity: 33.8,
    },
    {
      county: "01101",
      diabetes: 14.8,
      obesity: 42.4,
    },
    {
      county: "01103",
      diabetes: 10.5,
      obesity: 34.4,
    },
    {
      county: "01105",
      diabetes: 10.4,
      obesity: 25.5,
    },
    {
      county: "01107",
      diabetes: 11.9,
      obesity: 26.8,
    },
    {
      county: "01109",
      diabetes: 11.9,
      obesity: 27.9,
    },
    {
      county: "01111",
      diabetes: 9.8,
      obesity: 33,
    },
    {
      county: "01113",
      diabetes: 12.4,
      obesity: 29.3,
    },
    {
      county: "01115",
      diabetes: 10.6,
      obesity: 34.4,
    },
    {
      county: "01117",
      diabetes: 9.3,
      obesity: 29.9,
    },
    {
      county: "01119",
      diabetes: 10.3,
      obesity: 26.3,
    },
    {
      county: "01121",
      diabetes: 10.5,
      obesity: 35.7,
    },
    {
      county: "01123",
      diabetes: 10,
      obesity: 32.9,
    },
    {
      county: "01125",
      diabetes: 11,
      obesity: 38.8,
    },
    {
      county: "01127",
      diabetes: 9.6,
      obesity: 33.2,
    },
    {
      county: "01129",
      diabetes: 13.4,
      obesity: 33.1,
    },
    {
      county: "01131",
      diabetes: 11.1,
      obesity: 24.2,
    },
    {
      county: "01133",
      diabetes: 8.1,
      obesity: 29.9,
    },
    {
      county: "02013",
      diabetes: 10.8,
      obesity: 26.8,
    },
    {
      county: "02016",
      diabetes: 11.5,
      obesity: 29.6,
    },
    {
      county: "02020",
      diabetes: 7.6,
      obesity: 28.7,
    },
    {
      county: "02050",
      diabetes: 7.7,
      obesity: 28.4,
    },
    {
      county: "02060",
      diabetes: 8.4,
      obesity: 33.3,
    },
    {
      county: "02068",
      diabetes: 6.5,
      obesity: 20.7,
    },
    {
      county: "02070",
      diabetes: 7.3,
      obesity: 31.9,
    },
    {
      county: "02090",
      diabetes: 7.3,
      obesity: 29.3,
    },
    {
      county: "02100",
      diabetes: 7.1,
      obesity: 23.1,
    },
    {
      county: "02105",
      diabetes: 7.7,
      obesity: 21.1,
    },
    {
      county: "02110",
      diabetes: 7.5,
      obesity: 23.5,
    },
    {
      county: "02122",
      diabetes: 7.4,
      obesity: 29.5,
    },
    {
      county: "02130",
      diabetes: 8.7,
      obesity: 34.9,
    },
    {
      county: "02150",
      diabetes: 8.5,
      obesity: 31.4,
    },
    {
      county: "02158",
      diabetes: 8.1,
      obesity: 21.8,
    },
    {
      county: "02164",
      diabetes: 8.1,
      obesity: 20.8,
    },
    {
      county: "02170",
      diabetes: 8,
      obesity: 32.7,
    },
    {
      county: "02180",
      diabetes: 7.6,
      obesity: 29.8,
    },
    {
      county: "02185",
      diabetes: 10.4,
      obesity: 32.7,
    },
    {
      county: "02188",
      diabetes: 8.7,
      obesity: 32.9,
    },
    {
      county: "02195",
      diabetes: 7.6,
      obesity: 20.1,
    },
    {
      county: "02198",
      diabetes: 9.3,
      obesity: 22.2,
    },
    {
      county: "02201",
      diabetes: "No Data",
      obesity: "No Data",
    },
    {
      county: "02220",
      diabetes: 7.3,
      obesity: 24.3,
    },
    {
      county: "02230",
      diabetes: 6.7,
      obesity: 20.6,
    },
    {
      county: "02232",
      diabetes: "No Data",
      obesity: "No Data",
    },
    {
      county: "02240",
      diabetes: 7.5,
      obesity: 29.1,
    },
    {
      county: "02261",
      diabetes: "No Data",
      obesity: "No Data",
    },
    {
      county: "02270",
      diabetes: "No Data",
      obesity: "No Data",
    },
    {
      county: "02275",
      diabetes: 8.3,
      obesity: 26.2,
    },
    {
      county: "02280",
      diabetes: "No Data",
      obesity: "No Data",
    },
    {
      county: "02282",
      diabetes: 8.2,
      obesity: 17.7,
    },
    {
      county: "02290",
      diabetes: 9.6,
      obesity: 26.1,
    },
    {
      county: "04001",
      diabetes: 14.1,
      obesity: 34.9,
    },
    {
      county: "04003",
      diabetes: 8.6,
      obesity: 30.7,
    },
    {
      county: "04005",
      diabetes: 7.1,
      obesity: 24.2,
    },
    {
      county: "04007",
      diabetes: 9.2,
      obesity: 30.2,
    },
    {
      county: "04009",
      diabetes: 9.9,
      obesity: 31.3,
    },
    {
      county: "04011",
      diabetes: 7.5,
      obesity: 26.4,
    },
    {
      county: "04012",
      diabetes: 7.7,
      obesity: 26.2,
    },
    {
      county: "04013",
      diabetes: 8.5,
      obesity: 28.4,
    },
    {
      county: "04015",
      diabetes: 10.3,
      obesity: 32.1,
    },
    {
      county: "04017",
      diabetes: 11.3,
      obesity: 33.7,
    },
    {
      county: "04019",
      diabetes: 7.3,
      obesity: 26.5,
    },
    {
      county: "04021",
      diabetes: 10.6,
      obesity: 36.2,
    },
    {
      county: "04023",
      diabetes: 9.4,
      obesity: 31.5,
    },
    {
      county: "04025",
      diabetes: 6.2,
      obesity: 26.3,
    },
    {
      county: "04027",
      diabetes: 11.3,
      obesity: 38.9,
    },
    {
      county: "05001",
      diabetes: 11.4,
      obesity: 32.5,
    },
    {
      county: "05003",
      diabetes: 11.2,
      obesity: 32,
    },
    {
      county: "05005",
      diabetes: 7.5,
      obesity: 25.9,
    },
    {
      county: "05007",
      diabetes: 8.4,
      obesity: 27.1,
    },
    {
      county: "05009",
      diabetes: 9.3,
      obesity: 30.8,
    },
    {
      county: "05011",
      diabetes: 8,
      obesity: 26.6,
    },
    {
      county: "05013",
      diabetes: 9.4,
      obesity: 20.8,
    },
    {
      county: "05015",
      diabetes: 8.7,
      obesity: 28.5,
    },
    {
      county: "05017",
      diabetes: 9.2,
      obesity: 29.7,
    },
    {
      county: "05019",
      diabetes: 9.8,
      obesity: 30.7,
    },
    {
      county: "05021",
      diabetes: 9.7,
      obesity: 28.5,
    },
    {
      county: "05023",
      diabetes: 8.3,
      obesity: 32.1,
    },
    {
      county: "05025",
      diabetes: 9.7,
      obesity: 28,
    },
    {
      county: "05027",
      diabetes: 11.1,
      obesity: 31.5,
    },
    {
      county: "05029",
      diabetes: 8.6,
      obesity: 27.9,
    },
    {
      county: "05031",
      diabetes: 10.3,
      obesity: 40,
    },
    {
      county: "05033",
      diabetes: 10,
      obesity: 34.4,
    },
    {
      county: "05035",
      diabetes: 11.8,
      obesity: 38.3,
    },
    {
      county: "05037",
      diabetes: 11.1,
      obesity: 31.8,
    },
    {
      county: "05039",
      diabetes: 9,
      obesity: 20,
    },
    {
      county: "05041",
      diabetes: 10,
      obesity: 28.6,
    },
    {
      county: "05043",
      diabetes: 9,
      obesity: 28.4,
    },
    {
      county: "05045",
      diabetes: 10.4,
      obesity: 31.8,
    },
    {
      county: "05047",
      diabetes: 8.9,
      obesity: 24.1,
    },
    {
      county: "05049",
      diabetes: 9.2,
      obesity: 23.3,
    },
    {
      county: "05051",
      diabetes: 9.9,
      obesity: 25.7,
    },
    {
      county: "05053",
      diabetes: 8.5,
      obesity: 30.1,
    },
    {
      county: "05055",
      diabetes: 12.8,
      obesity: 32.3,
    },
    {
      county: "05057",
      diabetes: 10.5,
      obesity: 30.5,
    },
    {
      county: "05059",
      diabetes: 8.4,
      obesity: 29.8,
    },
    {
      county: "05061",
      diabetes: 8.2,
      obesity: 26.4,
    },
    {
      county: "05063",
      diabetes: 8.2,
      obesity: 30.5,
    },
    {
      county: "05065",
      diabetes: 7.8,
      obesity: 24.6,
    },
    {
      county: "05067",
      diabetes: 9.3,
      obesity: 23.3,
    },
    {
      county: "05069",
      diabetes: 14.8,
      obesity: 39.8,
    },
    {
      county: "05071",
      diabetes: 10.1,
      obesity: 33.2,
    },
    {
      county: "05073",
      diabetes: 8.2,
      obesity: 19.9,
    },
    {
      county: "05075",
      diabetes: 8.3,
      obesity: 34.5,
    },
    {
      county: "05077",
      diabetes: 10.4,
      obesity: 27.8,
    },
    {
      county: "05079",
      diabetes: 8.1,
      obesity: 21.9,
    },
    {
      county: "05081",
      diabetes: 7.8,
      obesity: 22.7,
    },
    {
      county: "05083",
      diabetes: 9.9,
      obesity: 33.8,
    },
    {
      county: "05085",
      diabetes: 10.7,
      obesity: 33,
    },
    {
      county: "05087",
      diabetes: 7.5,
      obesity: 25.1,
    },
    {
      county: "05089",
      diabetes: 8.8,
      obesity: 23.6,
    },
    {
      county: "05091",
      diabetes: 11.8,
      obesity: 28.9,
    },
    {
      county: "05093",
      diabetes: 12.3,
      obesity: 38.1,
    },
    {
      county: "05095",
      diabetes: 9.4,
      obesity: 22.6,
    },
    {
      county: "05097",
      diabetes: 7.5,
      obesity: 25.4,
    },
    {
      county: "05099",
      diabetes: 8.7,
      obesity: 20.8,
    },
    {
      county: "05101",
      diabetes: 8.1,
      obesity: 27.1,
    },
    {
      county: "05103",
      diabetes: 10.3,
      obesity: 29.8,
    },
    {
      county: "05105",
      diabetes: 9.2,
      obesity: 23,
    },
    {
      county: "05107",
      diabetes: 14.3,
      obesity: 36.7,
    },
    {
      county: "05109",
      diabetes: 8.5,
      obesity: 24.4,
    },
    {
      county: "05111",
      diabetes: 9.6,
      obesity: 32.1,
    },
    {
      county: "05113",
      diabetes: 8.8,
      obesity: 25.8,
    },
    {
      county: "05115",
      diabetes: 10.3,
      obesity: 37.2,
    },
    {
      county: "05117",
      diabetes: 8,
      obesity: 23.9,
    },
    {
      county: "05119",
      diabetes: 10,
      obesity: 34.6,
    },
    {
      county: "05121",
      diabetes: 10.3,
      obesity: 27.4,
    },
    {
      county: "05123",
      diabetes: 11.7,
      obesity: 36.1,
    },
    {
      county: "05125",
      diabetes: 9,
      obesity: 35.3,
    },
    {
      county: "05127",
      diabetes: 7.6,
      obesity: 19.9,
    },
    {
      county: "05129",
      diabetes: 7,
      obesity: 20.9,
    },
    {
      county: "05131",
      diabetes: 11,
      obesity: 30.6,
    },
    {
      county: "05133",
      diabetes: 10.4,
      obesity: 32.6,
    },
    {
      county: "05135",
      diabetes: 8.4,
      obesity: 31.1,
    },
    {
      county: "05137",
      diabetes: 6.9,
      obesity: 29.6,
    },
    {
      county: "05139",
      diabetes: 10.7,
      obesity: 38.1,
    },
    {
      county: "05141",
      diabetes: 12.1,
      obesity: 32.6,
    },
    {
      county: "05143",
      diabetes: 10.3,
      obesity: 31,
    },
    {
      county: "05145",
      diabetes: 10.7,
      obesity: 35.9,
    },
    {
      county: "05147",
      diabetes: 8.2,
      obesity: 23.4,
    },
    {
      county: "05149",
      diabetes: 9.1,
      obesity: 29.9,
    },
    {
      county: "06001",
      diabetes: 7.4,
      obesity: 23.5,
    },
    {
      county: "06003",
      diabetes: 7.4,
      obesity: 17.6,
    },
    {
      county: "06005",
      diabetes: 7.4,
      obesity: 21.3,
    },
    {
      county: "06007",
      diabetes: 6.7,
      obesity: 30.4,
    },
    {
      county: "06009",
      diabetes: 6.5,
      obesity: 22.5,
    },
    {
      county: "06011",
      diabetes: 6.9,
      obesity: 19,
    },
    {
      county: "06013",
      diabetes: 8.7,
      obesity: 25.3,
    },
    {
      county: "06015",
      diabetes: 7.4,
      obesity: 18.5,
    },
    {
      county: "06017",
      diabetes: 7.1,
      obesity: 25,
    },
    {
      county: "06019",
      diabetes: 10.6,
      obesity: 36.8,
    },
    {
      county: "06021",
      diabetes: 7.3,
      obesity: 19.6,
    },
    {
      county: "06023",
      diabetes: 7.3,
      obesity: 22.9,
    },
    {
      county: "06025",
      diabetes: 8.7,
      obesity: 32.1,
    },
    {
      county: "06027",
      diabetes: 7.3,
      obesity: 18.4,
    },
    {
      county: "06029",
      diabetes: 10.5,
      obesity: 33.4,
    },
    {
      county: "06031",
      diabetes: 9.9,
      obesity: 27.4,
    },
    {
      county: "06033",
      diabetes: 7.7,
      obesity: 24.6,
    },
    {
      county: "06035",
      diabetes: 7.8,
      obesity: 17.9,
    },
    {
      county: "06037",
      diabetes: 8.8,
      obesity: 25.5,
    },
    {
      county: "06039",
      diabetes: 9.2,
      obesity: 29.1,
    },
    {
      county: "06041",
      diabetes: 7,
      obesity: 16.2,
    },
    {
      county: "06043",
      diabetes: 6.9,
      obesity: 16.9,
    },
    {
      county: "06045",
      diabetes: 7.1,
      obesity: 24.1,
    },
    {
      county: "06047",
      diabetes: 9.3,
      obesity: 33.7,
    },
    {
      county: "06049",
      diabetes: 7.1,
      obesity: 17.8,
    },
    {
      county: "06051",
      diabetes: 7,
      obesity: 18.8,
    },
    {
      county: "06053",
      diabetes: 8.8,
      obesity: 31.3,
    },
    {
      county: "06055",
      diabetes: 7.5,
      obesity: 23.2,
    },
    {
      county: "06057",
      diabetes: 5.7,
      obesity: 19.4,
    },
    {
      county: "06059",
      diabetes: 8.5,
      obesity: 22.3,
    },
    {
      county: "06061",
      diabetes: 6.3,
      obesity: 23,
    },
    {
      county: "06063",
      diabetes: 7.1,
      obesity: 19,
    },
    {
      county: "06065",
      diabetes: 9.3,
      obesity: 32.2,
    },
    {
      county: "06067",
      diabetes: 8.6,
      obesity: 28.7,
    },
    {
      county: "06069",
      diabetes: 7.8,
      obesity: 20.2,
    },
    {
      county: "06071",
      diabetes: 10.2,
      obesity: 35.7,
    },
    {
      county: "06073",
      diabetes: 7.4,
      obesity: 24.3,
    },
    {
      county: "06075",
      diabetes: 9.2,
      obesity: 14.3,
    },
    {
      county: "06077",
      diabetes: 8.8,
      obesity: 32.3,
    },
    {
      county: "06079",
      diabetes: 7,
      obesity: 22.7,
    },
    {
      county: "06081",
      diabetes: 8.3,
      obesity: 18.9,
    },
    {
      county: "06083",
      diabetes: 7.3,
      obesity: 24.7,
    },
    {
      county: "06085",
      diabetes: 8.5,
      obesity: 20.7,
    },
    {
      county: "06087",
      diabetes: 7.8,
      obesity: 20.5,
    },
    {
      county: "06089",
      diabetes: 7.1,
      obesity: 23.3,
    },
    {
      county: "06091",
      diabetes: 6.8,
      obesity: 18.8,
    },
    {
      county: "06093",
      diabetes: 6.9,
      obesity: 21.3,
    },
    {
      county: "06095",
      diabetes: 9.4,
      obesity: 29.4,
    },
    {
      county: "06097",
      diabetes: 6.6,
      obesity: 23.2,
    },
    {
      county: "06099",
      diabetes: 9,
      obesity: 31.6,
    },
    {
      county: "06101",
      diabetes: 8.5,
      obesity: 23.1,
    },
    {
      county: "06103",
      diabetes: 7.1,
      obesity: 28,
    },
    {
      county: "06105",
      diabetes: 7.1,
      obesity: 17.5,
    },
    {
      county: "06107",
      diabetes: 10.2,
      obesity: 34.5,
    },
    {
      county: "06109",
      diabetes: 7.6,
      obesity: 17.5,
    },
    {
      county: "06111",
      diabetes: 7.5,
      obesity: 25.9,
    },
    {
      county: "06113",
      diabetes: 9,
      obesity: 27.6,
    },
    {
      county: "06115",
      diabetes: 7.7,
      obesity: 23.6,
    },
    {
      county: "08001",
      diabetes: 8.6,
      obesity: 30.7,
    },
    {
      county: "08003",
      diabetes: 8.2,
      obesity: 25.9,
    },
    {
      county: "08005",
      diabetes: 7.1,
      obesity: 24.1,
    },
    {
      county: "08007",
      diabetes: 6.5,
      obesity: 16.2,
    },
    {
      county: "08009",
      diabetes: 7.7,
      obesity: 19.8,
    },
    {
      county: "08011",
      diabetes: 8.1,
      obesity: 19.2,
    },
    {
      county: "08013",
      diabetes: 4.9,
      obesity: 15.5,
    },
    {
      county: "08014",
      diabetes: 6.4,
      obesity: 24.3,
    },
    {
      county: "08015",
      diabetes: 5.8,
      obesity: 18.9,
    },
    {
      county: "08017",
      diabetes: 7.1,
      obesity: 18.5,
    },
    {
      county: "08019",
      diabetes: 6.1,
      obesity: 19.3,
    },
    {
      county: "08021",
      diabetes: 7.3,
      obesity: 17.8,
    },
    {
      county: "08023",
      diabetes: 7.2,
      obesity: 17.4,
    },
    {
      county: "08025",
      diabetes: 7.2,
      obesity: 18.4,
    },
    {
      county: "08027",
      diabetes: 7.7,
      obesity: 18,
    },
    {
      county: "08029",
      diabetes: 6.6,
      obesity: 22.2,
    },
    {
      county: "08031",
      diabetes: 6.8,
      obesity: 19.8,
    },
    {
      county: "08033",
      diabetes: 7.4,
      obesity: 18.3,
    },
    {
      county: "08035",
      diabetes: 4.8,
      obesity: 18.9,
    },
    {
      county: "08037",
      diabetes: 5.4,
      obesity: 17.3,
    },
    {
      county: "08039",
      diabetes: 7,
      obesity: 25,
    },
    {
      county: "08041",
      diabetes: 6.9,
      obesity: 26,
    },
    {
      county: "08043",
      diabetes: 8.3,
      obesity: 26.9,
    },
    {
      county: "08045",
      diabetes: 5.8,
      obesity: 18.9,
    },
    {
      county: "08047",
      diabetes: 6.7,
      obesity: 16.1,
    },
    {
      county: "08049",
      diabetes: 7.2,
      obesity: 18.1,
    },
    {
      county: "08051",
      diabetes: 6.6,
      obesity: 16.6,
    },
    {
      county: "08053",
      diabetes: 7,
      obesity: 17.8,
    },
    {
      county: "08055",
      diabetes: 9.1,
      obesity: 17.8,
    },
    {
      county: "08057",
      diabetes: 7.5,
      obesity: 18,
    },
    {
      county: "08059",
      diabetes: 5.5,
      obesity: 22,
    },
    {
      county: "08061",
      diabetes: 7.4,
      obesity: 19.3,
    },
    {
      county: "08063",
      diabetes: 6.3,
      obesity: 21.8,
    },
    {
      county: "08065",
      diabetes: 7.2,
      obesity: 21.1,
    },
    {
      county: "08067",
      diabetes: 5.9,
      obesity: 21.4,
    },
    {
      county: "08069",
      diabetes: 5.9,
      obesity: 21.5,
    },
    {
      county: "08071",
      diabetes: 8.5,
      obesity: 26.3,
    },
    {
      county: "08073",
      diabetes: 7.4,
      obesity: 21.5,
    },
    {
      county: "08075",
      diabetes: 8.2,
      obesity: 26.8,
    },
    {
      county: "08077",
      diabetes: 7.3,
      obesity: 27.3,
    },
    {
      county: "08079",
      diabetes: 6.9,
      obesity: 17.8,
    },
    {
      county: "08081",
      diabetes: 7.3,
      obesity: 20.6,
    },
    {
      county: "08083",
      diabetes: 7.3,
      obesity: 22.5,
    },
    {
      county: "08085",
      diabetes: 7.8,
      obesity: 24.4,
    },
    {
      county: "08087",
      diabetes: 7.8,
      obesity: 40.7,
    },
    {
      county: "08089",
      diabetes: 8.1,
      obesity: 29.9,
    },
    {
      county: "08091",
      diabetes: 6.3,
      obesity: 17.9,
    },
    {
      county: "08093",
      diabetes: 6.1,
      obesity: 20,
    },
    {
      county: "08095",
      diabetes: 7.8,
      obesity: 22.5,
    },
    {
      county: "08097",
      diabetes: 5.8,
      obesity: 16.7,
    },
    {
      county: "08099",
      diabetes: 8.2,
      obesity: 31.9,
    },
    {
      county: "08101",
      diabetes: 9.2,
      obesity: 30.8,
    },
    {
      county: "08103",
      diabetes: 6.3,
      obesity: 19.1,
    },
    {
      county: "08105",
      diabetes: 7.3,
      obesity: 20,
    },
    {
      county: "08107",
      diabetes: 6.5,
      obesity: 14.5,
    },
    {
      county: "08109",
      diabetes: 6.7,
      obesity: 18.9,
    },
    {
      county: "08111",
      diabetes: 6.9,
      obesity: 17.9,
    },
    {
      county: "08113",
      diabetes: 7.1,
      obesity: 18.4,
    },
    {
      county: "08115",
      diabetes: 6.7,
      obesity: 20.8,
    },
    {
      county: "08117",
      diabetes: 5,
      obesity: 14.1,
    },
    {
      county: "08119",
      diabetes: 6.9,
      obesity: 21.2,
    },
    {
      county: "08121",
      diabetes: 7.5,
      obesity: 23.9,
    },
    {
      county: "08123",
      diabetes: 8.2,
      obesity: 31,
    },
    {
      county: "08125",
      diabetes: 7.9,
      obesity: 22,
    },
    {
      county: "09001",
      diabetes: 6.1,
      obesity: 22,
    },
    {
      county: "09003",
      diabetes: 8.7,
      obesity: 29.8,
    },
    {
      county: "09005",
      diabetes: 5.9,
      obesity: 27.2,
    },
    {
      county: "09007",
      diabetes: 6.7,
      obesity: 27.6,
    },
    {
      county: "09009",
      diabetes: 9.4,
      obesity: 31.9,
    },
    {
      county: "09011",
      diabetes: 7.4,
      obesity: 32.1,
    },
    {
      county: "09013",
      diabetes: 7.6,
      obesity: 26.2,
    },
    {
      county: "09015",
      diabetes: 9.6,
      obesity: 31.5,
    },
    {
      county: 10001,
      diabetes: 11.9,
      obesity: 38.7,
    },
    {
      county: 10003,
      diabetes: 10,
      obesity: 32.3,
    },
    {
      county: 10005,
      diabetes: 9.3,
      obesity: 35.4,
    },
    {
      county: 11001,
      diabetes: 8.1,
      obesity: 23.9,
    },
    {
      county: 12001,
      diabetes: 9.4,
      obesity: 28.7,
    },
    {
      county: 12003,
      diabetes: 11.9,
      obesity: 34.6,
    },
    {
      county: 12005,
      diabetes: 10.3,
      obesity: 31.1,
    },
    {
      county: 12007,
      diabetes: 11.6,
      obesity: 34.9,
    },
    {
      county: 12009,
      diabetes: 9.8,
      obesity: 29.7,
    },
    {
      county: 12011,
      diabetes: 8.3,
      obesity: 26.2,
    },
    {
      county: 12013,
      diabetes: 10.2,
      obesity: 34.8,
    },
    {
      county: 12015,
      diabetes: 7.1,
      obesity: 27.5,
    },
    {
      county: 12017,
      diabetes: 8.9,
      obesity: 30.5,
    },
    {
      county: 12019,
      diabetes: 11.8,
      obesity: 33,
    },
    {
      county: 12021,
      diabetes: 6.3,
      obesity: 19.4,
    },
    {
      county: 12023,
      diabetes: 11.3,
      obesity: 33.9,
    },
    {
      county: 12027,
      diabetes: 11.4,
      obesity: 33.9,
    },
    {
      county: 12029,
      diabetes: 10.3,
      obesity: 33.4,
    },
    {
      county: 12031,
      diabetes: 11.8,
      obesity: 33.2,
    },
    {
      county: 12033,
      diabetes: 11.2,
      obesity: 31.5,
    },
    {
      county: 12035,
      diabetes: 8.3,
      obesity: 31.1,
    },
    {
      county: 12037,
      diabetes: 8.4,
      obesity: 32.4,
    },
    {
      county: 12039,
      diabetes: 15.9,
      obesity: 36.1,
    },
    {
      county: 12041,
      diabetes: 9.4,
      obesity: 30.3,
    },
    {
      county: 12043,
      diabetes: 11.1,
      obesity: 30.1,
    },
    {
      county: 12045,
      diabetes: 9.4,
      obesity: 26.6,
    },
    {
      county: 12047,
      diabetes: 10,
      obesity: 30.8,
    },
    {
      county: 12049,
      diabetes: 11.6,
      obesity: 37.8,
    },
    {
      county: 12051,
      diabetes: 11.5,
      obesity: 34.3,
    },
    {
      county: 12053,
      diabetes: 10.1,
      obesity: 34.2,
    },
    {
      county: 12055,
      diabetes: 11.8,
      obesity: 32.6,
    },
    {
      county: 12057,
      diabetes: 9.2,
      obesity: 27.8,
    },
    {
      county: 12059,
      diabetes: 12.9,
      obesity: 37.9,
    },
    {
      county: 12061,
      diabetes: 8,
      obesity: 27.3,
    },
    {
      county: 12063,
      diabetes: 13.3,
      obesity: 35.3,
    },
    {
      county: 12065,
      diabetes: 8.9,
      obesity: 27.1,
    },
    {
      county: 12067,
      diabetes: 9.3,
      obesity: 31.4,
    },
    {
      county: 12069,
      diabetes: 11,
      obesity: 34.2,
    },
    {
      county: 12071,
      diabetes: 7.6,
      obesity: 24,
    },
    {
      county: 12073,
      diabetes: 8.3,
      obesity: 28.8,
    },
    {
      county: 12075,
      diabetes: 11.7,
      obesity: 35,
    },
    {
      county: 12077,
      diabetes: 10.8,
      obesity: 35.3,
    },
    {
      county: 12079,
      diabetes: 12.6,
      obesity: 35.4,
    },
    {
      county: 12081,
      diabetes: 9.2,
      obesity: 27.1,
    },
    {
      county: 12083,
      diabetes: 8.6,
      obesity: 36.7,
    },
    {
      county: 12085,
      diabetes: 6.9,
      obesity: 19.8,
    },
    {
      county: 12086,
      diabetes: 8,
      obesity: 23.3,
    },
    {
      county: 12087,
      diabetes: 6.8,
      obesity: 24.7,
    },
    {
      county: 12089,
      diabetes: 9,
      obesity: 30,
    },
    {
      county: 12091,
      diabetes: 8.3,
      obesity: 26.6,
    },
    {
      county: 12093,
      diabetes: 10,
      obesity: 32.1,
    },
    {
      county: 12095,
      diabetes: 9.2,
      obesity: 29.9,
    },
    {
      county: 12097,
      diabetes: 11.6,
      obesity: 34.1,
    },
    {
      county: 12099,
      diabetes: 8.3,
      obesity: 22.9,
    },
    {
      county: 12101,
      diabetes: 9.5,
      obesity: 28.8,
    },
    {
      county: 12103,
      diabetes: 7.8,
      obesity: 25.8,
    },
    {
      county: 12105,
      diabetes: 11.2,
      obesity: 35.3,
    },
    {
      county: 12107,
      diabetes: 10.7,
      obesity: 35.3,
    },
    {
      county: 12109,
      diabetes: 8.2,
      obesity: 23.1,
    },
    {
      county: 12111,
      diabetes: 8.1,
      obesity: 30.8,
    },
    {
      county: 12113,
      diabetes: 9.9,
      obesity: 30.2,
    },
    {
      county: 12115,
      diabetes: 6.3,
      obesity: 22.7,
    },
    {
      county: 12117,
      diabetes: 9.3,
      obesity: 26.5,
    },
    {
      county: 12119,
      diabetes: 9.3,
      obesity: 28.3,
    },
    {
      county: 12121,
      diabetes: 11,
      obesity: 35.2,
    },
    {
      county: 12123,
      diabetes: 11,
      obesity: 37,
    },
    {
      county: 12125,
      diabetes: 10.5,
      obesity: 29.6,
    },
    {
      county: 12127,
      diabetes: 10.7,
      obesity: 29.8,
    },
    {
      county: 12129,
      diabetes: 8.6,
      obesity: 31.2,
    },
    {
      county: 12131,
      diabetes: 10.9,
      obesity: 30,
    },
    {
      county: 12133,
      diabetes: 11.6,
      obesity: 35,
    },
    {
      county: 13001,
      diabetes: 9.4,
      obesity: 23.8,
    },
    {
      county: 13003,
      diabetes: 7.6,
      obesity: 19.2,
    },
    {
      county: 13005,
      diabetes: 8.4,
      obesity: 22.3,
    },
    {
      county: 13007,
      diabetes: 8,
      obesity: 17.4,
    },
    {
      county: 13009,
      diabetes: 8.3,
      obesity: 34.7,
    },
    {
      county: 13011,
      diabetes: 7.4,
      obesity: 19.5,
    },
    {
      county: 13013,
      diabetes: 8.9,
      obesity: 29.8,
    },
    {
      county: 13015,
      diabetes: 8.8,
      obesity: 28.8,
    },
    {
      county: 13017,
      diabetes: 9.7,
      obesity: 27,
    },
    {
      county: 13019,
      diabetes: 9.7,
      obesity: 26,
    },
    {
      county: 13021,
      diabetes: 15.6,
      obesity: 37.7,
    },
    {
      county: 13023,
      diabetes: 7.2,
      obesity: 26,
    },
    {
      county: 13025,
      diabetes: 8.5,
      obesity: 27.3,
    },
    {
      county: 13027,
      diabetes: 9.4,
      obesity: 26.3,
    },
    {
      county: 13029,
      diabetes: 8.6,
      obesity: 28,
    },
    {
      county: 13031,
      diabetes: 11,
      obesity: 33.8,
    },
    {
      county: 13033,
      diabetes: 11.1,
      obesity: 29.9,
    },
    {
      county: 13035,
      diabetes: 10.5,
      obesity: 23.2,
    },
    {
      county: 13037,
      diabetes: 9,
      obesity: 17,
    },
    {
      county: 13039,
      diabetes: 9.4,
      obesity: 34.2,
    },
    {
      county: 13043,
      diabetes: 7.7,
      obesity: 21.7,
    },
    {
      county: 13045,
      diabetes: 11.3,
      obesity: 32.4,
    },
    {
      county: 13047,
      diabetes: 8.6,
      obesity: 30.7,
    },
    {
      county: 13049,
      diabetes: 8.1,
      obesity: 26.6,
    },
    {
      county: 13051,
      diabetes: 10.2,
      obesity: 31.1,
    },
    {
      county: 13053,
      diabetes: 8.1,
      obesity: 18.5,
    },
    {
      county: 13055,
      diabetes: 9.4,
      obesity: 32.9,
    },
    {
      county: 13057,
      diabetes: 8.8,
      obesity: 29,
    },
    {
      county: 13059,
      diabetes: 9.9,
      obesity: 29.4,
    },
    {
      county: 13061,
      diabetes: 8.7,
      obesity: 20.8,
    },
    {
      county: 13063,
      diabetes: 12.8,
      obesity: 34.8,
    },
    {
      county: 13065,
      diabetes: 10.3,
      obesity: 24.2,
    },
    {
      county: 13067,
      diabetes: 7.9,
      obesity: 29.3,
    },
    {
      county: 13069,
      diabetes: 10.3,
      obesity: 25.8,
    },
    {
      county: 13071,
      diabetes: 9.4,
      obesity: 26.9,
    },
    {
      county: 13073,
      diabetes: 8.2,
      obesity: 31.5,
    },
    {
      county: 13075,
      diabetes: 12.3,
      obesity: 25.6,
    },
    {
      county: 13077,
      diabetes: 9,
      obesity: 34,
    },
    {
      county: 13079,
      diabetes: 8.8,
      obesity: 21.9,
    },
    {
      county: 13081,
      diabetes: 8.8,
      obesity: 20.2,
    },
    {
      county: 13083,
      diabetes: 6.7,
      obesity: 18.3,
    },
    {
      county: 13085,
      diabetes: 8.1,
      obesity: 25.3,
    },
    {
      county: 13087,
      diabetes: 10.5,
      obesity: 32,
    },
    {
      county: 13089,
      diabetes: 10.5,
      obesity: 26.3,
    },
    {
      county: 13091,
      diabetes: 10.3,
      obesity: 27.4,
    },
    {
      county: 13093,
      diabetes: 9.6,
      obesity: 23.1,
    },
    {
      county: 13095,
      diabetes: 13,
      obesity: 37.8,
    },
    {
      county: 13097,
      diabetes: 11.6,
      obesity: 30.5,
    },
    {
      county: 13099,
      diabetes: 8.5,
      obesity: 18.4,
    },
    {
      county: 13101,
      diabetes: 7.5,
      obesity: 17.4,
    },
    {
      county: 13103,
      diabetes: 10.4,
      obesity: 31.8,
    },
    {
      county: 13105,
      diabetes: 7.2,
      obesity: 18.8,
    },
    {
      county: 13107,
      diabetes: 10.2,
      obesity: 33.1,
    },
    {
      county: 13109,
      diabetes: 8.3,
      obesity: 23,
    },
    {
      county: 13111,
      diabetes: 8.1,
      obesity: 22,
    },
    {
      county: 13113,
      diabetes: 8.5,
      obesity: 27.7,
    },
    {
      county: 13115,
      diabetes: 12.7,
      obesity: 33.8,
    },
    {
      county: 13117,
      diabetes: 9,
      obesity: 25.4,
    },
    {
      county: 13119,
      diabetes: 7.2,
      obesity: 22.5,
    },
    {
      county: 13121,
      diabetes: 8.3,
      obesity: 26.4,
    },
    {
      county: 13123,
      diabetes: 8.8,
      obesity: 26.9,
    },
    {
      county: 13125,
      diabetes: 7.5,
      obesity: 19.8,
    },
    {
      county: 13127,
      diabetes: 10.6,
      obesity: 32.2,
    },
    {
      county: 13129,
      diabetes: 10.4,
      obesity: 37.4,
    },
    {
      county: 13131,
      diabetes: 11,
      obesity: 27.4,
    },
    {
      county: 13133,
      diabetes: 8.3,
      obesity: 23.5,
    },
    {
      county: 13135,
      diabetes: 9.6,
      obesity: 28.6,
    },
    {
      county: 13137,
      diabetes: 8.4,
      obesity: 27.5,
    },
    {
      county: 13139,
      diabetes: 9.9,
      obesity: 28.5,
    },
    {
      county: 13141,
      diabetes: 9.6,
      obesity: 23.2,
    },
    {
      county: 13143,
      diabetes: 7.5,
      obesity: 22.1,
    },
    {
      county: 13145,
      diabetes: 11.6,
      obesity: 26.7,
    },
    {
      county: 13147,
      diabetes: 8.7,
      obesity: 20.7,
    },
    {
      county: 13149,
      diabetes: 7.2,
      obesity: 17.8,
    },
    {
      county: 13151,
      diabetes: 10.7,
      obesity: 39.1,
    },
    {
      county: 13153,
      diabetes: 13,
      obesity: 35.7,
    },
    {
      county: 13155,
      diabetes: 7.8,
      obesity: 21.8,
    },
    {
      county: 13157,
      diabetes: 7.3,
      obesity: 28,
    },
    {
      county: 13159,
      diabetes: 8,
      obesity: 19.8,
    },
    {
      county: 13161,
      diabetes: 7.2,
      obesity: 20,
    },
    {
      county: 13163,
      diabetes: 10.1,
      obesity: 26.2,
    },
    {
      county: 13165,
      diabetes: 8.6,
      obesity: 23.8,
    },
    {
      county: 13167,
      diabetes: 11.9,
      obesity: 25.3,
    },
    {
      county: 13169,
      diabetes: 8.2,
      obesity: 24.2,
    },
    {
      county: 13171,
      diabetes: 7.5,
      obesity: 20.5,
    },
    {
      county: 13173,
      diabetes: 9.1,
      obesity: 23.2,
    },
    {
      county: 13175,
      diabetes: 12.6,
      obesity: 38.8,
    },
    {
      county: 13177,
      diabetes: 9.9,
      obesity: 28.4,
    },
    {
      county: 13179,
      diabetes: 10.6,
      obesity: 35.2,
    },
    {
      county: 13181,
      diabetes: 8.4,
      obesity: 19.6,
    },
    {
      county: 13183,
      diabetes: 8,
      obesity: 18.2,
    },
    {
      county: 13185,
      diabetes: 11.6,
      obesity: 35,
    },
    {
      county: 13187,
      diabetes: 7,
      obesity: 23.1,
    },
    {
      county: 13189,
      diabetes: 9.9,
      obesity: 28.3,
    },
    {
      county: 13191,
      diabetes: 8.3,
      obesity: 20.4,
    },
    {
      county: 13193,
      diabetes: 9.8,
      obesity: 19.8,
    },
    {
      county: 13195,
      diabetes: 8.6,
      obesity: 28.2,
    },
    {
      county: 13197,
      diabetes: 7.1,
      obesity: 18.9,
    },
    {
      county: 13199,
      diabetes: 9.8,
      obesity: 29.8,
    },
    {
      county: 13201,
      diabetes: 7.8,
      obesity: 19.3,
    },
    {
      county: 13205,
      diabetes: 8.8,
      obesity: 20.4,
    },
    {
      county: 13207,
      diabetes: 8.7,
      obesity: 18,
    },
    {
      county: 13209,
      diabetes: 8.1,
      obesity: 20.6,
    },
    {
      county: 13211,
      diabetes: 8.7,
      obesity: 24.7,
    },
    {
      county: 13213,
      diabetes: 11.1,
      obesity: 37.4,
    },
    {
      county: 13215,
      diabetes: 11.9,
      obesity: 35.8,
    },
    {
      county: 13217,
      diabetes: 10.4,
      obesity: 35,
    },
    {
      county: 13219,
      diabetes: 7.7,
      obesity: 25.4,
    },
    {
      county: 13221,
      diabetes: 7.6,
      obesity: 21.6,
    },
    {
      county: 13223,
      diabetes: 10.8,
      obesity: 31.6,
    },
    {
      county: 13225,
      diabetes: 9.7,
      obesity: 20.1,
    },
    {
      county: 13227,
      diabetes: 9.7,
      obesity: 26.6,
    },
    {
      county: 13229,
      diabetes: 11.1,
      obesity: 26.5,
    },
    {
      county: 13231,
      diabetes: 9.7,
      obesity: 22.1,
    },
    {
      county: 13233,
      diabetes: 11.3,
      obesity: 32.9,
    },
    {
      county: 13235,
      diabetes: 11.4,
      obesity: 23.8,
    },
    {
      county: 13237,
      diabetes: 7.3,
      obesity: 20.8,
    },
    {
      county: 13239,
      diabetes: 8.1,
      obesity: 17.5,
    },
    {
      county: 13241,
      diabetes: 8.3,
      obesity: 20.7,
    },
    {
      county: 13243,
      diabetes: 8.7,
      obesity: 21.4,
    },
    {
      county: 13245,
      diabetes: 14.7,
      obesity: 38.4,
    },
    {
      county: 13247,
      diabetes: 8.8,
      obesity: 34.1,
    },
    {
      county: 13249,
      diabetes: 7.5,
      obesity: 17.7,
    },
    {
      county: 13251,
      diabetes: 8.6,
      obesity: 26.7,
    },
    {
      county: 13253,
      diabetes: 9,
      obesity: 19.5,
    },
    {
      county: 13255,
      diabetes: 8,
      obesity: 31.3,
    },
    {
      county: 13257,
      diabetes: 8.8,
      obesity: 18.6,
    },
    {
      county: 13259,
      diabetes: 8.6,
      obesity: 16.6,
    },
    {
      county: 13261,
      diabetes: 12.7,
      obesity: 26.4,
    },
    {
      county: 13263,
      diabetes: 7.9,
      obesity: 18.8,
    },
    {
      county: 13265,
      diabetes: 8.2,
      obesity: 16.8,
    },
    {
      county: 13267,
      diabetes: 8.9,
      obesity: 22,
    },
    {
      county: 13269,
      diabetes: 9.9,
      obesity: 20.1,
    },
    {
      county: 13271,
      diabetes: 12.8,
      obesity: 33.4,
    },
    {
      county: 13273,
      diabetes: 8.1,
      obesity: 17.5,
    },
    {
      county: 13275,
      diabetes: 10.3,
      obesity: 24.6,
    },
    {
      county: 13277,
      diabetes: 12.8,
      obesity: 33.4,
    },
    {
      county: 13279,
      diabetes: 8.1,
      obesity: 32,
    },
    {
      county: 13281,
      diabetes: 7.7,
      obesity: 20.7,
    },
    {
      county: 13283,
      diabetes: 9.9,
      obesity: 22.5,
    },
    {
      county: 13285,
      diabetes: 9.9,
      obesity: 37,
    },
    {
      county: 13287,
      diabetes: 10.6,
      obesity: 20.8,
    },
    {
      county: 13289,
      diabetes: 8.6,
      obesity: 16.9,
    },
    {
      county: 13291,
      diabetes: 5.9,
      obesity: 21.7,
    },
    {
      county: 13293,
      diabetes: 8.7,
      obesity: 25.4,
    },
    {
      county: 13295,
      diabetes: 10.4,
      obesity: 26.1,
    },
    {
      county: 13297,
      diabetes: 8.7,
      obesity: 33.1,
    },
    {
      county: 13299,
      diabetes: 10.6,
      obesity: 27.8,
    },
    {
      county: 13301,
      diabetes: 9.4,
      obesity: 20.8,
    },
    {
      county: 13303,
      diabetes: 10.6,
      obesity: 19.6,
    },
    {
      county: 13305,
      diabetes: 10.7,
      obesity: 22.5,
    },
    {
      county: 13307,
      diabetes: 7.6,
      obesity: 17.5,
    },
    {
      county: 13309,
      diabetes: 8.4,
      obesity: 20.3,
    },
    {
      county: 13311,
      diabetes: 7.7,
      obesity: 21.8,
    },
    {
      county: 13313,
      diabetes: 12.1,
      obesity: 36,
    },
    {
      county: 13315,
      diabetes: 8.5,
      obesity: 21.2,
    },
    {
      county: 13317,
      diabetes: 10.4,
      obesity: 20.6,
    },
    {
      county: 13319,
      diabetes: 8.6,
      obesity: 18.8,
    },
    {
      county: 13321,
      diabetes: 10.3,
      obesity: 23.5,
    },
    {
      county: 15001,
      diabetes: 8.3,
      obesity: 25.9,
    },
    {
      county: 15003,
      diabetes: 9.8,
      obesity: 25.1,
    },
    {
      county: 15005,
      diabetes: 8.4,
      obesity: 16.9,
    },
    {
      county: 15007,
      diabetes: 8,
      obesity: 23.8,
    },
    {
      county: 15009,
      diabetes: 7.9,
      obesity: 24.9,
    },
    {
      county: 16001,
      diabetes: 7.1,
      obesity: 25.9,
    },
    {
      county: 16003,
      diabetes: 6.7,
      obesity: 23.4,
    },
    {
      county: 16005,
      diabetes: 8.7,
      obesity: 34.2,
    },
    {
      county: 16007,
      diabetes: 8.1,
      obesity: 28.5,
    },
    {
      county: 16009,
      diabetes: 8.8,
      obesity: 24.9,
    },
    {
      county: 16011,
      diabetes: 10.7,
      obesity: 38,
    },
    {
      county: 16013,
      diabetes: 5.5,
      obesity: 17.3,
    },
    {
      county: 16015,
      diabetes: 6.3,
      obesity: 27.7,
    },
    {
      county: 16017,
      diabetes: 6.8,
      obesity: 23.9,
    },
    {
      county: 16019,
      diabetes: 8.8,
      obesity: 33,
    },
    {
      county: 16021,
      diabetes: 7.3,
      obesity: 23.7,
    },
    {
      county: 16023,
      diabetes: 8,
      obesity: 23.6,
    },
    {
      county: 16025,
      diabetes: 7.5,
      obesity: 22.6,
    },
    {
      county: 16027,
      diabetes: 11.1,
      obesity: 35,
    },
    {
      county: 16029,
      diabetes: 7,
      obesity: 28.7,
    },
    {
      county: 16031,
      diabetes: 8.6,
      obesity: 32.2,
    },
    {
      county: 16033,
      diabetes: 7.1,
      obesity: 19.7,
    },
    {
      county: 16035,
      diabetes: 9.7,
      obesity: 28.8,
    },
    {
      county: 16037,
      diabetes: 7,
      obesity: 21.7,
    },
    {
      county: 16039,
      diabetes: 8.6,
      obesity: 29.6,
    },
    {
      county: 16041,
      diabetes: 7.2,
      obesity: 28.9,
    },
    {
      county: 16043,
      diabetes: 9.1,
      obesity: 28.2,
    },
    {
      county: 16045,
      diabetes: 8.4,
      obesity: 29.1,
    },
    {
      county: 16047,
      diabetes: 8.2,
      obesity: 34.2,
    },
    {
      county: 16049,
      diabetes: 8.3,
      obesity: 26.7,
    },
    {
      county: 16051,
      diabetes: 6.6,
      obesity: 35,
    },
    {
      county: 16053,
      diabetes: 6.9,
      obesity: 26.9,
    },
    {
      county: 16055,
      diabetes: 8.4,
      obesity: 28.1,
    },
    {
      county: 16057,
      diabetes: 7.9,
      obesity: 25.4,
    },
    {
      county: 16059,
      diabetes: 7.8,
      obesity: 30.4,
    },
    {
      county: 16061,
      diabetes: 11.5,
      obesity: 31.3,
    },
    {
      county: 16063,
      diabetes: 7.9,
      obesity: 23.9,
    },
    {
      county: 16065,
      diabetes: 6.5,
      obesity: 31,
    },
    {
      county: 16067,
      diabetes: 9.4,
      obesity: 32.3,
    },
    {
      county: 16069,
      diabetes: 10.3,
      obesity: 31.4,
    },
    {
      county: 16071,
      diabetes: 8.3,
      obesity: 23.5,
    },
    {
      county: 16073,
      diabetes: 7.4,
      obesity: 22.1,
    },
    {
      county: 16075,
      diabetes: 8.7,
      obesity: 33,
    },
    {
      county: 16077,
      diabetes: 7.2,
      obesity: 29.6,
    },
    {
      county: 16079,
      diabetes: 10,
      obesity: 32.9,
    },
    {
      county: 16081,
      diabetes: 6.2,
      obesity: 25.3,
    },
    {
      county: 16083,
      diabetes: 9.2,
      obesity: 31.5,
    },
    {
      county: 16085,
      diabetes: 5.4,
      obesity: 14.7,
    },
    {
      county: 16087,
      diabetes: 8.3,
      obesity: 33.1,
    },
    {
      county: 17001,
      diabetes: 7.9,
      obesity: 20.4,
    },
    {
      county: 17003,
      diabetes: 7.4,
      obesity: 17.7,
    },
    {
      county: 17005,
      diabetes: 7.1,
      obesity: 18.5,
    },
    {
      county: 17007,
      diabetes: 7.2,
      obesity: 20.8,
    },
    {
      county: 17009,
      diabetes: 7.2,
      obesity: 17.4,
    },
    {
      county: 17011,
      diabetes: 7.6,
      obesity: 22.5,
    },
    {
      county: 17013,
      diabetes: 6.8,
      obesity: 18.2,
    },
    {
      county: 17015,
      diabetes: 7.1,
      obesity: 20.9,
    },
    {
      county: 17017,
      diabetes: 7.1,
      obesity: 17.8,
    },
    {
      county: 17019,
      diabetes: 8.1,
      obesity: 24.6,
    },
    {
      county: 17021,
      diabetes: 7.8,
      obesity: 24.4,
    },
    {
      county: 17023,
      diabetes: 6.6,
      obesity: 19.5,
    },
    {
      county: 17025,
      diabetes: 7.3,
      obesity: 20.1,
    },
    {
      county: 17027,
      diabetes: 6.9,
      obesity: 21.9,
    },
    {
      county: 17029,
      diabetes: 7.4,
      obesity: 22.1,
    },
    {
      county: 17031,
      diabetes: 8.5,
      obesity: 26.7,
    },
    {
      county: 17033,
      diabetes: 7.5,
      obesity: 21.6,
    },
    {
      county: 17035,
      diabetes: 7.3,
      obesity: 18.1,
    },
    {
      county: 17037,
      diabetes: 8.1,
      obesity: 29.2,
    },
    {
      county: 17039,
      diabetes: 6.7,
      obesity: 18.1,
    },
    {
      county: 17041,
      diabetes: 7.1,
      obesity: 20.8,
    },
    {
      county: 17043,
      diabetes: 7.4,
      obesity: 24.5,
    },
    {
      county: 17045,
      diabetes: 7.2,
      obesity: 19.5,
    },
    {
      county: 17047,
      diabetes: 6.6,
      obesity: 18.2,
    },
    {
      county: 17049,
      diabetes: 6.7,
      obesity: 20.3,
    },
    {
      county: 17051,
      diabetes: 7,
      obesity: 21.2,
    },
    {
      county: 17053,
      diabetes: 7.4,
      obesity: 18.6,
    },
    {
      county: 17055,
      diabetes: 8.1,
      obesity: 23.1,
    },
    {
      county: 17057,
      diabetes: 7.3,
      obesity: 22.2,
    },
    {
      county: 17059,
      diabetes: 6.9,
      obesity: 17.7,
    },
    {
      county: 17061,
      diabetes: 7.2,
      obesity: 18.7,
    },
    {
      county: 17063,
      diabetes: 7.3,
      obesity: 22.7,
    },
    {
      county: 17065,
      diabetes: 6.8,
      obesity: 19.1,
    },
    {
      county: 17067,
      diabetes: 7.2,
      obesity: 22.1,
    },
    {
      county: 17069,
      diabetes: 6.9,
      obesity: 18.7,
    },
    {
      county: 17071,
      diabetes: 7.2,
      obesity: 22.8,
    },
    {
      county: 17073,
      diabetes: 6.8,
      obesity: 23.6,
    },
    {
      county: 17075,
      diabetes: 7.5,
      obesity: 20.8,
    },
    {
      county: 17077,
      diabetes: 8.3,
      obesity: 23,
    },
    {
      county: 17079,
      diabetes: 7.2,
      obesity: 18.5,
    },
    {
      county: 17081,
      diabetes: 7.1,
      obesity: 20.2,
    },
    {
      county: 17083,
      diabetes: 7.7,
      obesity: 22.5,
    },
    {
      county: 17085,
      diabetes: 7.9,
      obesity: 27.3,
    },
    {
      county: 17087,
      diabetes: 7,
      obesity: 18.4,
    },
    {
      county: 17089,
      diabetes: 9.6,
      obesity: 32.7,
    },
    {
      county: 17091,
      diabetes: 8.6,
      obesity: 29.8,
    },
    {
      county: 17093,
      diabetes: 8.8,
      obesity: 26.3,
    },
    {
      county: 17095,
      diabetes: 7.6,
      obesity: 27.1,
    },
    {
      county: 17097,
      diabetes: 7.7,
      obesity: 27.7,
    },
    {
      county: 17099,
      diabetes: 8.4,
      obesity: 29.5,
    },
    {
      county: 17101,
      diabetes: 7,
      obesity: 18.4,
    },
    {
      county: 17103,
      diabetes: 7,
      obesity: 22.6,
    },
    {
      county: 17105,
      diabetes: 8.1,
      obesity: 21.6,
    },
    {
      county: 17107,
      diabetes: 7.2,
      obesity: 19.3,
    },
    {
      county: 17109,
      diabetes: 7.1,
      obesity: 19.4,
    },
    {
      county: 17111,
      diabetes: 7.5,
      obesity: 31,
    },
    {
      county: 17113,
      diabetes: 8.1,
      obesity: 29.7,
    },
    {
      county: 17115,
      diabetes: 7.3,
      obesity: 26.8,
    },
    {
      county: 17117,
      diabetes: 8.4,
      obesity: 25.1,
    },
    {
      county: 17119,
      diabetes: 9.5,
      obesity: 35.8,
    },
    {
      county: 17121,
      diabetes: 8.8,
      obesity: 19.7,
    },
    {
      county: 17123,
      diabetes: 6.9,
      obesity: 18.1,
    },
    {
      county: 17125,
      diabetes: 7,
      obesity: 21.6,
    },
    {
      county: 17127,
      diabetes: 7.1,
      obesity: 18.5,
    },
    {
      county: 17129,
      diabetes: 7.3,
      obesity: 21.6,
    },
    {
      county: 17131,
      diabetes: 8.1,
      obesity: 21.7,
    },
    {
      county: 17133,
      diabetes: 8.3,
      obesity: 24.3,
    },
    {
      county: 17135,
      diabetes: 7.6,
      obesity: 26.5,
    },
    {
      county: 17137,
      diabetes: 7.1,
      obesity: 23,
    },
    {
      county: 17139,
      diabetes: 6.9,
      obesity: 17.6,
    },
    {
      county: 17141,
      diabetes: 7,
      obesity: 25.1,
    },
    {
      county: 17143,
      diabetes: 8.8,
      obesity: 32.4,
    },
    {
      county: 17145,
      diabetes: 7.7,
      obesity: 20.5,
    },
    {
      county: 17147,
      diabetes: 7.1,
      obesity: 19.7,
    },
    {
      county: 17149,
      diabetes: 7.1,
      obesity: 18.8,
    },
    {
      county: 17151,
      diabetes: 7,
      obesity: 17.8,
    },
    {
      county: 17153,
      diabetes: 7.6,
      obesity: 18.8,
    },
    {
      county: 17155,
      diabetes: 7,
      obesity: 17.6,
    },
    {
      county: 17157,
      diabetes: 6.8,
      obesity: 24.2,
    },
    {
      county: 17159,
      diabetes: 7,
      obesity: 18.3,
    },
    {
      county: 17161,
      diabetes: 9.7,
      obesity: 28.3,
    },
    {
      county: 17163,
      diabetes: 9.1,
      obesity: 34.8,
    },
    {
      county: 17165,
      diabetes: 6.7,
      obesity: 18.7,
    },
    {
      county: 17167,
      diabetes: 9,
      obesity: 29.1,
    },
    {
      county: 17169,
      diabetes: 6.7,
      obesity: 17.6,
    },
    {
      county: 17171,
      diabetes: 7,
      obesity: 17.7,
    },
    {
      county: 17173,
      diabetes: 7.2,
      obesity: 19.3,
    },
    {
      county: 17175,
      diabetes: 6.9,
      obesity: 18.6,
    },
    {
      county: 17177,
      diabetes: 7.4,
      obesity: 25.4,
    },
    {
      county: 17179,
      diabetes: 7.2,
      obesity: 24.4,
    },
    {
      county: 17181,
      diabetes: 7.2,
      obesity: 18.6,
    },
    {
      county: 17183,
      diabetes: 6.9,
      obesity: 28.9,
    },
    {
      county: 17185,
      diabetes: 7.4,
      obesity: 18.1,
    },
    {
      county: 17187,
      diabetes: 7.3,
      obesity: 20.3,
    },
    {
      county: 17189,
      diabetes: 7,
      obesity: 19.8,
    },
    {
      county: 17191,
      diabetes: 7.2,
      obesity: 20.8,
    },
    {
      county: 17193,
      diabetes: 7.2,
      obesity: 20.2,
    },
    {
      county: 17195,
      diabetes: 8.6,
      obesity: 30.4,
    },
    {
      county: 17197,
      diabetes: 8.2,
      obesity: 32.3,
    },
    {
      county: 17199,
      diabetes: 9.4,
      obesity: 21.7,
    },
    {
      county: 17201,
      diabetes: 8.7,
      obesity: 35.8,
    },
    {
      county: 17203,
      diabetes: 7,
      obesity: 23.1,
    },
    {
      county: 18001,
      diabetes: 7.7,
      obesity: 30.4,
    },
    {
      county: 18003,
      diabetes: 9,
      obesity: 36.4,
    },
    {
      county: 18005,
      diabetes: 10.1,
      obesity: 32.2,
    },
    {
      county: 18007,
      diabetes: 6.8,
      obesity: 21.6,
    },
    {
      county: 18009,
      diabetes: 7.7,
      obesity: 28.9,
    },
    {
      county: 18011,
      diabetes: 8.1,
      obesity: 30.7,
    },
    {
      county: 18013,
      diabetes: 8.2,
      obesity: 23,
    },
    {
      county: 18015,
      diabetes: 8.3,
      obesity: 33.2,
    },
    {
      county: 18017,
      diabetes: 8.6,
      obesity: 30.5,
    },
    {
      county: 18019,
      diabetes: 9.3,
      obesity: 36.1,
    },
    {
      county: 18021,
      diabetes: 9.7,
      obesity: 28.7,
    },
    {
      county: 18023,
      diabetes: 9,
      obesity: 38,
    },
    {
      county: 18025,
      diabetes: 8.8,
      obesity: 24,
    },
    {
      county: 18027,
      diabetes: 8.4,
      obesity: 32.7,
    },
    {
      county: 18029,
      diabetes: 7.4,
      obesity: 29,
    },
    {
      county: 18031,
      diabetes: 10.8,
      obesity: 33.8,
    },
    {
      county: 18033,
      diabetes: 8.6,
      obesity: 31.7,
    },
    {
      county: 18035,
      diabetes: 11.7,
      obesity: 35.1,
    },
    {
      county: 18037,
      diabetes: 7.8,
      obesity: 30.5,
    },
    {
      county: 18039,
      diabetes: 8.1,
      obesity: 33.8,
    },
    {
      county: 18041,
      diabetes: 9.3,
      obesity: 25.6,
    },
    {
      county: 18043,
      diabetes: 7.4,
      obesity: 26.4,
    },
    {
      county: 18045,
      diabetes: 8.2,
      obesity: 21.6,
    },
    {
      county: 18047,
      diabetes: 7.3,
      obesity: 25.3,
    },
    {
      county: 18049,
      diabetes: 8.1,
      obesity: 24.3,
    },
    {
      county: 18051,
      diabetes: 7.9,
      obesity: 31.2,
    },
    {
      county: 18053,
      diabetes: 10.2,
      obesity: 32.4,
    },
    {
      county: 18055,
      diabetes: 8.9,
      obesity: 31.2,
    },
    {
      county: 18057,
      diabetes: 8.4,
      obesity: 25,
    },
    {
      county: 18059,
      diabetes: 9.4,
      obesity: 35,
    },
    {
      county: 18061,
      diabetes: 9.3,
      obesity: 36.4,
    },
    {
      county: 18063,
      diabetes: 9.5,
      obesity: 29.6,
    },
    {
      county: 18065,
      diabetes: 7.6,
      obesity: 35,
    },
    {
      county: 18067,
      diabetes: 9.8,
      obesity: 37.4,
    },
    {
      county: 18069,
      diabetes: 10.5,
      obesity: 32.4,
    },
    {
      county: 18071,
      diabetes: 10.8,
      obesity: 29.1,
    },
    {
      county: 18073,
      diabetes: 8.1,
      obesity: 27.8,
    },
    {
      county: 18075,
      diabetes: 8.2,
      obesity: 28.8,
    },
    {
      county: 18077,
      diabetes: 7.9,
      obesity: 26.4,
    },
    {
      county: 18079,
      diabetes: 10.3,
      obesity: 33.4,
    },
    {
      county: 18081,
      diabetes: 10.5,
      obesity: 30,
    },
    {
      county: 18083,
      diabetes: 9.6,
      obesity: 39.7,
    },
    {
      county: 18085,
      diabetes: 9.9,
      obesity: 32.9,
    },
    {
      county: 18087,
      diabetes: 8.2,
      obesity: 28.8,
    },
    {
      county: 18089,
      diabetes: 11.5,
      obesity: 39.1,
    },
    {
      county: 18091,
      diabetes: 11.7,
      obesity: 35.5,
    },
    {
      county: 18093,
      diabetes: 8.7,
      obesity: 36.2,
    },
    {
      county: 18095,
      diabetes: 12.9,
      obesity: 37.3,
    },
    {
      county: 18097,
      diabetes: 11.4,
      obesity: 34.5,
    },
    {
      county: 18099,
      diabetes: 7.3,
      obesity: 34.5,
    },
    {
      county: 18101,
      diabetes: 7.9,
      obesity: 26,
    },
    {
      county: 18103,
      diabetes: 10,
      obesity: 28.2,
    },
    {
      county: 18105,
      diabetes: 8.3,
      obesity: 26.1,
    },
    {
      county: 18107,
      diabetes: 8.9,
      obesity: 37.4,
    },
    {
      county: 18109,
      diabetes: 15.1,
      obesity: 38.2,
    },
    {
      county: 18111,
      diabetes: 8.5,
      obesity: 24.4,
    },
    {
      county: 18113,
      diabetes: 8.8,
      obesity: 31.9,
    },
    {
      county: 18115,
      diabetes: 6.7,
      obesity: 19.9,
    },
    {
      county: 18117,
      diabetes: 10.7,
      obesity: 22,
    },
    {
      county: 18119,
      diabetes: 10.7,
      obesity: 29.5,
    },
    {
      county: 18121,
      diabetes: 8.8,
      obesity: 26.7,
    },
    {
      county: 18123,
      diabetes: 7.3,
      obesity: 26.4,
    },
    {
      county: 18125,
      diabetes: 8.4,
      obesity: 22.4,
    },
    {
      county: 18127,
      diabetes: 9.1,
      obesity: 34,
    },
    {
      county: 18129,
      diabetes: 8.2,
      obesity: 29.4,
    },
    {
      county: 18131,
      diabetes: 7.2,
      obesity: 30.1,
    },
    {
      county: 18133,
      diabetes: 11.6,
      obesity: 27.8,
    },
    {
      county: 18135,
      diabetes: 8.4,
      obesity: 24.4,
    },
    {
      county: 18137,
      diabetes: 8.4,
      obesity: 29.2,
    },
    {
      county: 18139,
      diabetes: 8.7,
      obesity: 25.8,
    },
    {
      county: 18141,
      diabetes: 8.9,
      obesity: 35.8,
    },
    {
      county: 18143,
      diabetes: 9.9,
      obesity: 25.8,
    },
    {
      county: 18145,
      diabetes: 10.3,
      obesity: 33.5,
    },
    {
      county: 18147,
      diabetes: 7.3,
      obesity: 25.8,
    },
    {
      county: 18149,
      diabetes: 7.9,
      obesity: 30.7,
    },
    {
      county: 18151,
      diabetes: 7.8,
      obesity: 31.2,
    },
    {
      county: 18153,
      diabetes: 8.4,
      obesity: 27.2,
    },
    {
      county: 18155,
      diabetes: 7.5,
      obesity: 22.9,
    },
    {
      county: 18157,
      diabetes: 8.5,
      obesity: 31.8,
    },
    {
      county: 18159,
      diabetes: 8.9,
      obesity: 26.1,
    },
    {
      county: 18161,
      diabetes: 7.3,
      obesity: 19.2,
    },
    {
      county: 18163,
      diabetes: 10.5,
      obesity: 32.9,
    },
    {
      county: 18165,
      diabetes: 7.5,
      obesity: 22.3,
    },
    {
      county: 18167,
      diabetes: 10.6,
      obesity: 29.9,
    },
    {
      county: 18169,
      diabetes: 9.6,
      obesity: 33.8,
    },
    {
      county: 18171,
      diabetes: 8.5,
      obesity: 22.3,
    },
    {
      county: 18173,
      diabetes: 9.5,
      obesity: 37.4,
    },
    {
      county: 18175,
      diabetes: 8.2,
      obesity: 28.7,
    },
    {
      county: 18177,
      diabetes: 8.4,
      obesity: 33.1,
    },
    {
      county: 18179,
      diabetes: 7.5,
      obesity: 25.5,
    },
    {
      county: 18181,
      diabetes: 9.9,
      obesity: 30.8,
    },
    {
      county: 18183,
      diabetes: 7.8,
      obesity: 28.5,
    },
    {
      county: 19001,
      diabetes: 7.6,
      obesity: 26.4,
    },
    {
      county: 19003,
      diabetes: 7,
      obesity: 23,
    },
    {
      county: 19005,
      diabetes: 7.3,
      obesity: 31.1,
    },
    {
      county: 19007,
      diabetes: 7.7,
      obesity: 32.4,
    },
    {
      county: 19009,
      diabetes: 8.7,
      obesity: 23.6,
    },
    {
      county: 19011,
      diabetes: 8.2,
      obesity: 34.4,
    },
    {
      county: 19013,
      diabetes: 8.9,
      obesity: 37.2,
    },
    {
      county: 19015,
      diabetes: 9.5,
      obesity: 35.9,
    },
    {
      county: 19017,
      diabetes: 7,
      obesity: 34.6,
    },
    {
      county: 19019,
      diabetes: 9,
      obesity: 38.6,
    },
    {
      county: 19021,
      diabetes: 7,
      obesity: 22,
    },
    {
      county: 19023,
      diabetes: 7.1,
      obesity: 28.9,
    },
    {
      county: 19025,
      diabetes: 8.1,
      obesity: 27,
    },
    {
      county: 19027,
      diabetes: 6.6,
      obesity: 28.1,
    },
    {
      county: 19029,
      diabetes: 7.8,
      obesity: 27.8,
    },
    {
      county: 19031,
      diabetes: 6.4,
      obesity: 38.4,
    },
    {
      county: 19033,
      diabetes: 9.4,
      obesity: 32.7,
    },
    {
      county: 19035,
      diabetes: 8.6,
      obesity: 32.9,
    },
    {
      county: 19037,
      diabetes: 7.1,
      obesity: 27.6,
    },
    {
      county: 19039,
      diabetes: 7.3,
      obesity: 26.6,
    },
    {
      county: 19041,
      diabetes: 7.9,
      obesity: 35.4,
    },
    {
      county: 19043,
      diabetes: 8.1,
      obesity: 37.1,
    },
    {
      county: 19045,
      diabetes: 8.5,
      obesity: 36.7,
    },
    {
      county: 19047,
      diabetes: 7.3,
      obesity: 30.8,
    },
    {
      county: 19049,
      diabetes: 6.2,
      obesity: 32.7,
    },
    {
      county: 19051,
      diabetes: 8.3,
      obesity: 30.1,
    },
    {
      county: 19053,
      diabetes: 6.5,
      obesity: 24.7,
    },
    {
      county: 19055,
      diabetes: 8.3,
      obesity: 36.5,
    },
    {
      county: 19057,
      diabetes: 8.5,
      obesity: 31.9,
    },
    {
      county: 19059,
      diabetes: 7.6,
      obesity: 30,
    },
    {
      county: 19061,
      diabetes: 7.6,
      obesity: 33.3,
    },
    {
      county: 19063,
      diabetes: 7.8,
      obesity: 29.7,
    },
    {
      county: 19065,
      diabetes: 7.6,
      obesity: 34,
    },
    {
      county: 19067,
      diabetes: 7.8,
      obesity: 34.1,
    },
    {
      county: 19069,
      diabetes: 9.2,
      obesity: 36.8,
    },
    {
      county: 19071,
      diabetes: 7.8,
      obesity: 32,
    },
    {
      county: 19073,
      diabetes: 7.3,
      obesity: 25,
    },
    {
      county: 19075,
      diabetes: 7,
      obesity: 31.8,
    },
    {
      county: 19077,
      diabetes: 6.8,
      obesity: 33.9,
    },
    {
      county: 19079,
      diabetes: 7.5,
      obesity: 30.5,
    },
    {
      county: 19081,
      diabetes: 7.6,
      obesity: 25.4,
    },
    {
      county: 19083,
      diabetes: 8.6,
      obesity: 32.2,
    },
    {
      county: 19085,
      diabetes: 9,
      obesity: 34,
    },
    {
      county: 19087,
      diabetes: 8.6,
      obesity: 28.4,
    },
    {
      county: 19089,
      diabetes: 6.8,
      obesity: 31.9,
    },
    {
      county: 19091,
      diabetes: 8.4,
      obesity: 25.6,
    },
    {
      county: 19093,
      diabetes: 6.3,
      obesity: 27.8,
    },
    {
      county: 19095,
      diabetes: 7.8,
      obesity: 38.5,
    },
    {
      county: 19097,
      diabetes: 7.4,
      obesity: 32.4,
    },
    {
      county: 19099,
      diabetes: 8.7,
      obesity: 33.5,
    },
    {
      county: 19101,
      diabetes: 6.4,
      obesity: 25.2,
    },
    {
      county: 19103,
      diabetes: 7,
      obesity: 25.9,
    },
    {
      county: 19105,
      diabetes: 9,
      obesity: 34.3,
    },
    {
      county: 19107,
      diabetes: 7.8,
      obesity: 32.7,
    },
    {
      county: 19109,
      diabetes: 9.7,
      obesity: 33.5,
    },
    {
      county: 19111,
      diabetes: 8.8,
      obesity: 35.3,
    },
    {
      county: 19113,
      diabetes: 8.8,
      obesity: 35.9,
    },
    {
      county: 19115,
      diabetes: 7.6,
      obesity: 25.2,
    },
    {
      county: 19117,
      diabetes: 9.1,
      obesity: 25.1,
    },
    {
      county: 19119,
      diabetes: 6.9,
      obesity: 24.2,
    },
    {
      county: 19121,
      diabetes: 7,
      obesity: 31.9,
    },
    {
      county: 19123,
      diabetes: 7.2,
      obesity: 24.5,
    },
    {
      county: 19125,
      diabetes: 8,
      obesity: 30.8,
    },
    {
      county: 19127,
      diabetes: 9.2,
      obesity: 37.4,
    },
    {
      county: 19129,
      diabetes: 8.4,
      obesity: 27.7,
    },
    {
      county: 19131,
      diabetes: 7.7,
      obesity: 30.4,
    },
    {
      county: 19133,
      diabetes: 9.1,
      obesity: 29,
    },
    {
      county: 19135,
      diabetes: 7.1,
      obesity: 28.6,
    },
    {
      county: 19137,
      diabetes: 8.7,
      obesity: 32.1,
    },
    {
      county: 19139,
      diabetes: 9,
      obesity: 41.4,
    },
    {
      county: 19141,
      diabetes: 6.7,
      obesity: 27.7,
    },
    {
      county: 19143,
      diabetes: 7.5,
      obesity: 28,
    },
    {
      county: 19145,
      diabetes: 10.5,
      obesity: 34.7,
    },
    {
      county: 19147,
      diabetes: 8.2,
      obesity: 34,
    },
    {
      county: 19149,
      diabetes: 6.5,
      obesity: 29.1,
    },
    {
      county: 19151,
      diabetes: 7.3,
      obesity: 26.8,
    },
    {
      county: 19153,
      diabetes: 8.8,
      obesity: 35.5,
    },
    {
      county: 19155,
      diabetes: 9.5,
      obesity: 39.4,
    },
    {
      county: 19157,
      diabetes: 7.6,
      obesity: 33.6,
    },
    {
      county: 19159,
      diabetes: 8.8,
      obesity: 28.8,
    },
    {
      county: 19161,
      diabetes: 7.1,
      obesity: 36.2,
    },
    {
      county: 19163,
      diabetes: 9.9,
      obesity: 35.1,
    },
    {
      county: 19165,
      diabetes: 9,
      obesity: 32.5,
    },
    {
      county: 19167,
      diabetes: 7.9,
      obesity: 31.1,
    },
    {
      county: 19169,
      diabetes: 7.5,
      obesity: 27.3,
    },
    {
      county: 19171,
      diabetes: 6.8,
      obesity: 32.9,
    },
    {
      county: 19173,
      diabetes: 7.4,
      obesity: 27.4,
    },
    {
      county: 19175,
      diabetes: 10.1,
      obesity: 27.2,
    },
    {
      county: 19177,
      diabetes: 7.4,
      obesity: 25.8,
    },
    {
      county: 19179,
      diabetes: 11.8,
      obesity: 33.9,
    },
    {
      county: 19181,
      diabetes: 8.8,
      obesity: 36.2,
    },
    {
      county: 19183,
      diabetes: 7.3,
      obesity: 31.8,
    },
    {
      county: 19185,
      diabetes: 9.5,
      obesity: 29.1,
    },
    {
      county: 19187,
      diabetes: 8.3,
      obesity: 31.1,
    },
    {
      county: 19189,
      diabetes: 7.4,
      obesity: 30,
    },
    {
      county: 19191,
      diabetes: 5.9,
      obesity: 27.9,
    },
    {
      county: 19193,
      diabetes: 11.5,
      obesity: 37.3,
    },
    {
      county: 19195,
      diabetes: 7.3,
      obesity: 22.4,
    },
    {
      county: 19197,
      diabetes: 10.1,
      obesity: 37.4,
    },
    {
      county: 20001,
      diabetes: 10.3,
      obesity: 35.5,
    },
    {
      county: 20003,
      diabetes: 6.4,
      obesity: 30.2,
    },
    {
      county: 20005,
      diabetes: 7.2,
      obesity: 29.9,
    },
    {
      county: 20007,
      diabetes: 7.1,
      obesity: 30.2,
    },
    {
      county: 20009,
      diabetes: 10.8,
      obesity: 30.2,
    },
    {
      county: 20011,
      diabetes: 11,
      obesity: 40.4,
    },
    {
      county: 20013,
      diabetes: 9.5,
      obesity: 33.8,
    },
    {
      county: 20015,
      diabetes: 9.7,
      obesity: 36.8,
    },
    {
      county: 20017,
      diabetes: 7.6,
      obesity: 22.7,
    },
    {
      county: 20019,
      diabetes: 6.9,
      obesity: 22.1,
    },
    {
      county: 20021,
      diabetes: 10.1,
      obesity: 27.3,
    },
    {
      county: 20023,
      diabetes: 7.6,
      obesity: 21.5,
    },
    {
      county: 20025,
      diabetes: 5.9,
      obesity: 24.7,
    },
    {
      county: 20027,
      diabetes: 10.4,
      obesity: 34.7,
    },
    {
      county: 20029,
      diabetes: 8.8,
      obesity: 30.5,
    },
    {
      county: 20031,
      diabetes: 7.8,
      obesity: 27,
    },
    {
      county: 20033,
      diabetes: 7.4,
      obesity: 22.7,
    },
    {
      county: 20035,
      diabetes: 9.9,
      obesity: 36.8,
    },
    {
      county: 20037,
      diabetes: 7.7,
      obesity: 31.8,
    },
    {
      county: 20039,
      diabetes: 6.8,
      obesity: 24.9,
    },
    {
      county: 20041,
      diabetes: 7.6,
      obesity: 36.2,
    },
    {
      county: 20043,
      diabetes: 8.7,
      obesity: 22.8,
    },
    {
      county: 20045,
      diabetes: 7.2,
      obesity: 29,
    },
    {
      county: 20047,
      diabetes: 10.4,
      obesity: 26.6,
    },
    {
      county: 20049,
      diabetes: 9.1,
      obesity: 21.9,
    },
    {
      county: 20051,
      diabetes: 7.8,
      obesity: 27.7,
    },
    {
      county: 20053,
      diabetes: 7.4,
      obesity: 26.9,
    },
    {
      county: 20055,
      diabetes: 9.8,
      obesity: 41.4,
    },
    {
      county: 20057,
      diabetes: 10,
      obesity: 36.8,
    },
    {
      county: 20059,
      diabetes: 8.7,
      obesity: 35.3,
    },
    {
      county: 20061,
      diabetes: 9.2,
      obesity: 32.2,
    },
    {
      county: 20063,
      diabetes: 8,
      obesity: 23,
    },
    {
      county: 20065,
      diabetes: 6.6,
      obesity: 27,
    },
    {
      county: 20067,
      diabetes: 6.5,
      obesity: 27.2,
    },
    {
      county: 20069,
      diabetes: 5.7,
      obesity: 31.3,
    },
    {
      county: 20071,
      diabetes: 6.3,
      obesity: 17.8,
    },
    {
      county: 20073,
      diabetes: 8.3,
      obesity: 28.9,
    },
    {
      county: 20075,
      diabetes: 7.2,
      obesity: 17.6,
    },
    {
      county: 20077,
      diabetes: 6.9,
      obesity: 23.6,
    },
    {
      county: 20079,
      diabetes: 7.5,
      obesity: 30.9,
    },
    {
      county: 20081,
      diabetes: 7.6,
      obesity: 22.2,
    },
    {
      county: 20083,
      diabetes: 7.3,
      obesity: 25.2,
    },
    {
      county: 20085,
      diabetes: 8.7,
      obesity: 32.2,
    },
    {
      county: 20087,
      diabetes: 9.9,
      obesity: 33.2,
    },
    {
      county: 20089,
      diabetes: 8,
      obesity: 22.9,
    },
    {
      county: 20091,
      diabetes: 7.4,
      obesity: 28.7,
    },
    {
      county: 20093,
      diabetes: 7.7,
      obesity: 21.5,
    },
    {
      county: 20095,
      diabetes: 7.6,
      obesity: 33.3,
    },
    {
      county: 20097,
      diabetes: 8.3,
      obesity: 26.8,
    },
    {
      county: 20099,
      diabetes: 10.1,
      obesity: 32.8,
    },
    {
      county: 20101,
      diabetes: 7.2,
      obesity: 24.2,
    },
    {
      county: 20103,
      diabetes: 11.1,
      obesity: 35.1,
    },
    {
      county: 20105,
      diabetes: 8,
      obesity: 25.2,
    },
    {
      county: 20107,
      diabetes: 10.5,
      obesity: 30.8,
    },
    {
      county: 20109,
      diabetes: 7.4,
      obesity: 22.2,
    },
    {
      county: 20111,
      diabetes: 8.2,
      obesity: 36,
    },
    {
      county: 20113,
      diabetes: 9.1,
      obesity: 31.1,
    },
    {
      county: 20115,
      diabetes: 9,
      obesity: 25,
    },
    {
      county: 20117,
      diabetes: 7.5,
      obesity: 33.8,
    },
    {
      county: 20119,
      diabetes: 6.9,
      obesity: 19.7,
    },
    {
      county: 20121,
      diabetes: 8,
      obesity: 37.6,
    },
    {
      county: 20123,
      diabetes: 8.5,
      obesity: 33.9,
    },
    {
      county: 20125,
      diabetes: 11,
      obesity: 38.1,
    },
    {
      county: 20127,
      diabetes: 8.3,
      obesity: 28.4,
    },
    {
      county: 20129,
      diabetes: 7.3,
      obesity: 21.5,
    },
    {
      county: 20131,
      diabetes: 5.8,
      obesity: 28.5,
    },
    {
      county: 20133,
      diabetes: 7.7,
      obesity: 34.2,
    },
    {
      county: 20135,
      diabetes: 9,
      obesity: 27.8,
    },
    {
      county: 20137,
      diabetes: 8.6,
      obesity: 24.1,
    },
    {
      county: 20139,
      diabetes: 9,
      obesity: 42.8,
    },
    {
      county: 20141,
      diabetes: 8.3,
      obesity: 28.8,
    },
    {
      county: 20143,
      diabetes: 8.8,
      obesity: 28.5,
    },
    {
      county: 20145,
      diabetes: 8.8,
      obesity: 32.2,
    },
    {
      county: 20147,
      diabetes: 6.8,
      obesity: 28.7,
    },
    {
      county: 20149,
      diabetes: 9,
      obesity: 33.7,
    },
    {
      county: 20151,
      diabetes: 7.4,
      obesity: 28,
    },
    {
      county: 20153,
      diabetes: 7.2,
      obesity: 22.6,
    },
    {
      county: 20155,
      diabetes: 11.3,
      obesity: 39.8,
    },
    {
      county: 20157,
      diabetes: 8.4,
      obesity: 30.8,
    },
    {
      county: 20159,
      diabetes: 9.7,
      obesity: 33.3,
    },
    {
      county: 20161,
      diabetes: 7.4,
      obesity: 25.1,
    },
    {
      county: 20163,
      diabetes: 7.2,
      obesity: 23.5,
    },
    {
      county: 20165,
      diabetes: 7.4,
      obesity: 23.5,
    },
    {
      county: 20167,
      diabetes: 7.3,
      obesity: 28.7,
    },
    {
      county: 20169,
      diabetes: 9.8,
      obesity: 36.4,
    },
    {
      county: 20171,
      diabetes: 7.9,
      obesity: 21.4,
    },
    {
      county: 20173,
      diabetes: 10.4,
      obesity: 35.1,
    },
    {
      county: 20175,
      diabetes: 9,
      obesity: 32.1,
    },
    {
      county: 20177,
      diabetes: 11.1,
      obesity: 37,
    },
    {
      county: 20179,
      diabetes: 6.7,
      obesity: 26.2,
    },
    {
      county: 20181,
      diabetes: 6.4,
      obesity: 31.6,
    },
    {
      county: 20183,
      diabetes: 7.4,
      obesity: 26.3,
    },
    {
      county: 20185,
      diabetes: 7.9,
      obesity: 24.6,
    },
    {
      county: 20187,
      diabetes: 6.9,
      obesity: 19.2,
    },
    {
      county: 20189,
      diabetes: 8.1,
      obesity: 30.4,
    },
    {
      county: 20191,
      diabetes: 9.5,
      obesity: 33.2,
    },
    {
      county: 20193,
      diabetes: 8.7,
      obesity: 28.4,
    },
    {
      county: 20195,
      diabetes: 9.4,
      obesity: 25.6,
    },
    {
      county: 20197,
      diabetes: 9.1,
      obesity: 30.9,
    },
    {
      county: 20199,
      diabetes: 6.7,
      obesity: 18.7,
    },
    {
      county: 20201,
      diabetes: 7.2,
      obesity: 24.8,
    },
    {
      county: 20203,
      diabetes: 8.2,
      obesity: 28.3,
    },
    {
      county: 20205,
      diabetes: 9.2,
      obesity: 28.9,
    },
    {
      county: 20207,
      diabetes: 8,
      obesity: 23.5,
    },
    {
      county: 20209,
      diabetes: 12.3,
      obesity: 42,
    },
    {
      county: 21001,
      diabetes: 8.5,
      obesity: 27.8,
    },
    {
      county: 21003,
      diabetes: 8.6,
      obesity: 21.9,
    },
    {
      county: 21005,
      diabetes: 7.5,
      obesity: 19,
    },
    {
      county: 21007,
      diabetes: 7.6,
      obesity: 21,
    },
    {
      county: 21009,
      diabetes: 9.3,
      obesity: 28.3,
    },
    {
      county: 21011,
      diabetes: 10.2,
      obesity: 30.9,
    },
    {
      county: 21013,
      diabetes: 8.8,
      obesity: 30.2,
    },
    {
      county: 21015,
      diabetes: 9.5,
      obesity: 35,
    },
    {
      county: 21017,
      diabetes: 7.3,
      obesity: 23.1,
    },
    {
      county: 21019,
      diabetes: 13.6,
      obesity: 40.7,
    },
    {
      county: 21021,
      diabetes: 9.4,
      obesity: 27.3,
    },
    {
      county: 21023,
      diabetes: 7.2,
      obesity: 28,
    },
    {
      county: 21025,
      diabetes: 9.7,
      obesity: 32.2,
    },
    {
      county: 21027,
      diabetes: 8.2,
      obesity: 27,
    },
    {
      county: 21029,
      diabetes: 8.7,
      obesity: 34.6,
    },
    {
      county: 21031,
      diabetes: 8,
      obesity: 23.8,
    },
    {
      county: 21033,
      diabetes: 9.9,
      obesity: 26.8,
    },
    {
      county: 21035,
      diabetes: 8.3,
      obesity: 29.8,
    },
    {
      county: 21037,
      diabetes: 7.9,
      obesity: 36.4,
    },
    {
      county: 21039,
      diabetes: 7.2,
      obesity: 21,
    },
    {
      county: 21041,
      diabetes: 8.1,
      obesity: 24.3,
    },
    {
      county: 21043,
      diabetes: 11.2,
      obesity: 34.1,
    },
    {
      county: 21045,
      diabetes: 8.3,
      obesity: 19.3,
    },
    {
      county: 21047,
      diabetes: 12,
      obesity: 31.1,
    },
    {
      county: 21049,
      diabetes: 8.1,
      obesity: 27.5,
    },
    {
      county: 21051,
      diabetes: 9,
      obesity: 25.1,
    },
    {
      county: 21053,
      diabetes: 8.8,
      obesity: 28.4,
    },
    {
      county: 21055,
      diabetes: 8.8,
      obesity: 24.4,
    },
    {
      county: 21057,
      diabetes: 7.2,
      obesity: 19.5,
    },
    {
      county: 21059,
      diabetes: 9.9,
      obesity: 33,
    },
    {
      county: 21061,
      diabetes: 8.2,
      obesity: 25.7,
    },
    {
      county: 21063,
      diabetes: 7.5,
      obesity: 25.4,
    },
    {
      county: 21065,
      diabetes: 7.7,
      obesity: 23.1,
    },
    {
      county: 21067,
      diabetes: 8.9,
      obesity: 29.5,
    },
    {
      county: 21069,
      diabetes: 9.4,
      obesity: 31.3,
    },
    {
      county: 21071,
      diabetes: 11.8,
      obesity: 36.2,
    },
    {
      county: 21073,
      diabetes: 8.7,
      obesity: 30.4,
    },
    {
      county: 21075,
      diabetes: 8.1,
      obesity: 20.3,
    },
    {
      county: 21077,
      diabetes: 8,
      obesity: 21.7,
    },
    {
      county: 21079,
      diabetes: 7.2,
      obesity: 22.7,
    },
    {
      county: 21081,
      diabetes: 9.9,
      obesity: 26.4,
    },
    {
      county: 21083,
      diabetes: 10.2,
      obesity: 31.7,
    },
    {
      county: 21085,
      diabetes: 8.6,
      obesity: 32.8,
    },
    {
      county: 21087,
      diabetes: 7.8,
      obesity: 20.6,
    },
    {
      county: 21089,
      diabetes: 9.8,
      obesity: 35.5,
    },
    {
      county: 21091,
      diabetes: 7.8,
      obesity: 22.1,
    },
    {
      county: 21093,
      diabetes: 9.9,
      obesity: 35,
    },
    {
      county: 21095,
      diabetes: 12,
      obesity: 41.9,
    },
    {
      county: 21097,
      diabetes: 7.7,
      obesity: 24.9,
    },
    {
      county: 21099,
      diabetes: 8.8,
      obesity: 26.7,
    },
    {
      county: 21101,
      diabetes: 10.7,
      obesity: 35.1,
    },
    {
      county: 21103,
      diabetes: 7.2,
      obesity: 25.3,
    },
    {
      county: 21105,
      diabetes: 7.6,
      obesity: 20,
    },
    {
      county: 21107,
      diabetes: 13,
      obesity: 36.3,
    },
    {
      county: 21109,
      diabetes: 9,
      obesity: 32.1,
    },
    {
      county: 21111,
      diabetes: 10.4,
      obesity: 32.6,
    },
    {
      county: 21113,
      diabetes: 7.7,
      obesity: 26.9,
    },
    {
      county: 21115,
      diabetes: 9.7,
      obesity: 36.5,
    },
    {
      county: 21117,
      diabetes: 10.1,
      obesity: 33.9,
    },
    {
      county: 21119,
      diabetes: 12.2,
      obesity: 31.3,
    },
    {
      county: 21121,
      diabetes: 8.5,
      obesity: 29.6,
    },
    {
      county: 21123,
      diabetes: 8,
      obesity: 26.9,
    },
    {
      county: 21125,
      diabetes: 10.8,
      obesity: 32,
    },
    {
      county: 21127,
      diabetes: 7.6,
      obesity: 27.1,
    },
    {
      county: 21129,
      diabetes: 8.6,
      obesity: 28.5,
    },
    {
      county: 21131,
      diabetes: 10.7,
      obesity: 26.6,
    },
    {
      county: 21133,
      diabetes: 10.1,
      obesity: 36.8,
    },
    {
      county: 21135,
      diabetes: 9.4,
      obesity: 28.8,
    },
    {
      county: 21137,
      diabetes: 9.1,
      obesity: 24.5,
    },
    {
      county: 21139,
      diabetes: 7.9,
      obesity: 24.7,
    },
    {
      county: 21141,
      diabetes: 8.9,
      obesity: 24.2,
    },
    {
      county: 21143,
      diabetes: 9.1,
      obesity: 24.2,
    },
    {
      county: 21145,
      diabetes: 10.3,
      obesity: 32.5,
    },
    {
      county: 21147,
      diabetes: 10.1,
      obesity: 30.1,
    },
    {
      county: 21149,
      diabetes: 7.7,
      obesity: 24.7,
    },
    {
      county: 21151,
      diabetes: 8.5,
      obesity: 33,
    },
    {
      county: 21153,
      diabetes: 10.2,
      obesity: 31.1,
    },
    {
      county: 21155,
      diabetes: 7.8,
      obesity: 25.5,
    },
    {
      county: 21157,
      diabetes: 8.2,
      obesity: 32.7,
    },
    {
      county: 21159,
      diabetes: 8.9,
      obesity: 24.7,
    },
    {
      county: 21161,
      diabetes: 8.2,
      obesity: 30.5,
    },
    {
      county: 21163,
      diabetes: 7.9,
      obesity: 27.8,
    },
    {
      county: 21165,
      diabetes: 10.4,
      obesity: 29.8,
    },
    {
      county: 21167,
      diabetes: 8.8,
      obesity: 30.1,
    },
    {
      county: 21169,
      diabetes: 7.5,
      obesity: 24.1,
    },
    {
      county: 21171,
      diabetes: 7,
      obesity: 20.1,
    },
    {
      county: 21173,
      diabetes: 8.6,
      obesity: 34,
    },
    {
      county: 21175,
      diabetes: 8.4,
      obesity: 28.3,
    },
    {
      county: 21177,
      diabetes: 13.2,
      obesity: 36.2,
    },
    {
      county: 21179,
      diabetes: 9,
      obesity: 31,
    },
    {
      county: 21181,
      diabetes: 7.9,
      obesity: 19.8,
    },
    {
      county: 21183,
      diabetes: 9.8,
      obesity: 24.6,
    },
    {
      county: 21185,
      diabetes: 8,
      obesity: 32,
    },
    {
      county: 21187,
      diabetes: 8.9,
      obesity: 21.3,
    },
    {
      county: 21189,
      diabetes: 7.3,
      obesity: 22.8,
    },
    {
      county: 21191,
      diabetes: 8.2,
      obesity: 30.6,
    },
    {
      county: 21193,
      diabetes: 10.1,
      obesity: 36.6,
    },
    {
      county: 21195,
      diabetes: 11.3,
      obesity: 37.8,
    },
    {
      county: 21197,
      diabetes: 8,
      obesity: 19.3,
    },
    {
      county: 21199,
      diabetes: 10,
      obesity: 36.3,
    },
    {
      county: 21201,
      diabetes: 7.1,
      obesity: 17.9,
    },
    {
      county: 21203,
      diabetes: 8.3,
      obesity: 25.8,
    },
    {
      county: 21205,
      diabetes: 8.4,
      obesity: 32,
    },
    {
      county: 21207,
      diabetes: 9.2,
      obesity: 26.9,
    },
    {
      county: 21209,
      diabetes: 6.3,
      obesity: 26.8,
    },
    {
      county: 21211,
      diabetes: 7.2,
      obesity: 27.1,
    },
    {
      county: 21213,
      diabetes: 7.9,
      obesity: 24.9,
    },
    {
      county: 21215,
      diabetes: 8.1,
      obesity: 23.2,
    },
    {
      county: 21217,
      diabetes: 8.8,
      obesity: 29.1,
    },
    {
      county: 21219,
      diabetes: 8,
      obesity: 26.5,
    },
    {
      county: 21221,
      diabetes: 10.2,
      obesity: 30.5,
    },
    {
      county: 21223,
      diabetes: 7.7,
      obesity: 21.9,
    },
    {
      county: 21225,
      diabetes: 7.9,
      obesity: 25.1,
    },
    {
      county: 21227,
      diabetes: 8.1,
      obesity: 29.8,
    },
    {
      county: 21229,
      diabetes: 8,
      obesity: 22.6,
    },
    {
      county: 21231,
      diabetes: 9.2,
      obesity: 30.9,
    },
    {
      county: 21233,
      diabetes: 7.6,
      obesity: 28.1,
    },
    {
      county: 21235,
      diabetes: 11.4,
      obesity: 28.3,
    },
    {
      county: 21237,
      diabetes: 11,
      obesity: 29.9,
    },
    {
      county: 21239,
      diabetes: 7.5,
      obesity: 23.8,
    },
    {
      county: 22001,
      diabetes: 11.1,
      obesity: 35.7,
    },
    {
      county: 22003,
      diabetes: 8.3,
      obesity: 24.7,
    },
    {
      county: 22005,
      diabetes: 9.4,
      obesity: 29.9,
    },
    {
      county: 22007,
      diabetes: 9.2,
      obesity: 31.2,
    },
    {
      county: 22009,
      diabetes: 10.2,
      obesity: 31,
    },
    {
      county: 22011,
      diabetes: 9.9,
      obesity: 29.1,
    },
    {
      county: 22013,
      diabetes: 8.3,
      obesity: 16.5,
    },
    {
      county: 22015,
      diabetes: 10,
      obesity: 34,
    },
    {
      county: 22017,
      diabetes: 13.5,
      obesity: 41.2,
    },
    {
      county: 22019,
      diabetes: 12.3,
      obesity: 36.2,
    },
    {
      county: 22021,
      diabetes: 7.4,
      obesity: 18.8,
    },
    {
      county: 22023,
      diabetes: 7,
      obesity: 19.5,
    },
    {
      county: 22025,
      diabetes: 8,
      obesity: 19.5,
    },
    {
      county: 22027,
      diabetes: 8.8,
      obesity: 22.4,
    },
    {
      county: 22029,
      diabetes: 10.1,
      obesity: 25.8,
    },
    {
      county: 22031,
      diabetes: 10.4,
      obesity: 24.5,
    },
    {
      county: 22033,
      diabetes: 11.1,
      obesity: 34.6,
    },
    {
      county: 22035,
      diabetes: 7.9,
      obesity: 16.5,
    },
    {
      county: 22037,
      diabetes: 8.7,
      obesity: 22.7,
    },
    {
      county: 22039,
      diabetes: 10.2,
      obesity: 26.5,
    },
    {
      county: 22041,
      diabetes: 7.8,
      obesity: 22.2,
    },
    {
      county: 22043,
      diabetes: 9.3,
      obesity: 27.6,
    },
    {
      county: 22045,
      diabetes: 10.5,
      obesity: 32.7,
    },
    {
      county: 22047,
      diabetes: 11,
      obesity: 24.8,
    },
    {
      county: 22049,
      diabetes: 7.4,
      obesity: 21.9,
    },
    {
      county: 22051,
      diabetes: 11.1,
      obesity: 34.4,
    },
    {
      county: 22053,
      diabetes: 7.5,
      obesity: 32.1,
    },
    {
      county: 22055,
      diabetes: 10,
      obesity: 31.2,
    },
    {
      county: 22057,
      diabetes: 12.8,
      obesity: 34.6,
    },
    {
      county: 22059,
      diabetes: 7.9,
      obesity: 23.2,
    },
    {
      county: 22061,
      diabetes: 8,
      obesity: 23.3,
    },
    {
      county: 22063,
      diabetes: 9.7,
      obesity: 38.7,
    },
    {
      county: 22065,
      diabetes: 8.7,
      obesity: 20.1,
    },
    {
      county: 22067,
      diabetes: 8.3,
      obesity: 23.4,
    },
    {
      county: 22069,
      diabetes: 9.9,
      obesity: 29.5,
    },
    {
      county: 22071,
      diabetes: 9.8,
      obesity: 26.9,
    },
    {
      county: 22073,
      diabetes: 12.1,
      obesity: 36.8,
    },
    {
      county: 22075,
      diabetes: 8.2,
      obesity: 20.7,
    },
    {
      county: 22077,
      diabetes: 10.3,
      obesity: 23.3,
    },
    {
      county: 22079,
      diabetes: 11.9,
      obesity: 41,
    },
    {
      county: 22081,
      diabetes: 7.9,
      obesity: 18.5,
    },
    {
      county: 22083,
      diabetes: 8.4,
      obesity: 22,
    },
    {
      county: 22085,
      diabetes: 7.5,
      obesity: 27.4,
    },
    {
      county: 22087,
      diabetes: 10.7,
      obesity: 28.3,
    },
    {
      county: 22089,
      diabetes: 8.6,
      obesity: 28.7,
    },
    {
      county: 22091,
      diabetes: 7.8,
      obesity: 20.8,
    },
    {
      county: 22093,
      diabetes: 11.3,
      obesity: 30.5,
    },
    {
      county: 22095,
      diabetes: 10.1,
      obesity: 31.3,
    },
    {
      county: 22097,
      diabetes: 10,
      obesity: 33,
    },
    {
      county: 22099,
      diabetes: 9.5,
      obesity: 32.1,
    },
    {
      county: 22101,
      diabetes: 12.2,
      obesity: 29.3,
    },
    {
      county: 22103,
      diabetes: 8.8,
      obesity: 28,
    },
    {
      county: 22105,
      diabetes: 10.9,
      obesity: 38.7,
    },
    {
      county: 22107,
      diabetes: 7.9,
      obesity: 18.2,
    },
    {
      county: 22109,
      diabetes: 14.3,
      obesity: 41.8,
    },
    {
      county: 22111,
      diabetes: 7.7,
      obesity: 19,
    },
    {
      county: 22113,
      diabetes: 8.2,
      obesity: 34.7,
    },
    {
      county: 22115,
      diabetes: 10,
      obesity: 39.1,
    },
    {
      county: 22117,
      diabetes: 12.7,
      obesity: 37,
    },
    {
      county: 22119,
      diabetes: 10.5,
      obesity: 27.7,
    },
    {
      county: 22121,
      diabetes: 10,
      obesity: 23.1,
    },
    {
      county: 22123,
      diabetes: 8.8,
      obesity: 21.8,
    },
    {
      county: 22125,
      diabetes: 8.2,
      obesity: 18.6,
    },
    {
      county: 22127,
      diabetes: 7.9,
      obesity: 18.7,
    },
    {
      county: 23001,
      diabetes: 9.6,
      obesity: 33.4,
    },
    {
      county: 23003,
      diabetes: 10.3,
      obesity: 36.9,
    },
    {
      county: 23005,
      diabetes: 6.9,
      obesity: 24.8,
    },
    {
      county: 23007,
      diabetes: 7.2,
      obesity: 31.3,
    },
    {
      county: 23009,
      diabetes: 6.5,
      obesity: 28.7,
    },
    {
      county: 23011,
      diabetes: 9.3,
      obesity: 33.6,
    },
    {
      county: 23013,
      diabetes: 7.5,
      obesity: 27.7,
    },
    {
      county: 23015,
      diabetes: 6.6,
      obesity: 22.6,
    },
    {
      county: 23017,
      diabetes: 8.2,
      obesity: 33.3,
    },
    {
      county: 23019,
      diabetes: 10,
      obesity: 34.6,
    },
    {
      county: 23021,
      diabetes: 9.1,
      obesity: 33.4,
    },
    {
      county: 23023,
      diabetes: 8.3,
      obesity: 29.4,
    },
    {
      county: 23025,
      diabetes: 10.1,
      obesity: 31.9,
    },
    {
      county: 23027,
      diabetes: 6.9,
      obesity: 31.1,
    },
    {
      county: 23029,
      diabetes: 8.8,
      obesity: 33.5,
    },
    {
      county: 23031,
      diabetes: 7.5,
      obesity: 30,
    },
    {
      county: 24001,
      diabetes: 10.4,
      obesity: 34.4,
    },
    {
      county: 24003,
      diabetes: 8.7,
      obesity: 30.6,
    },
    {
      county: 24005,
      diabetes: 8.9,
      obesity: 32,
    },
    {
      county: 24009,
      diabetes: 9.3,
      obesity: 32.7,
    },
    {
      county: 24011,
      diabetes: 12.6,
      obesity: 39.7,
    },
    {
      county: 24013,
      diabetes: 8.2,
      obesity: 28.5,
    },
    {
      county: 24015,
      diabetes: 9.3,
      obesity: 36.2,
    },
    {
      county: 24017,
      diabetes: 11.7,
      obesity: 41.5,
    },
    {
      county: 24019,
      diabetes: 13.8,
      obesity: 38.3,
    },
    {
      county: 24021,
      diabetes: 8.9,
      obesity: 29.7,
    },
    {
      county: 24023,
      diabetes: 9.5,
      obesity: 30.9,
    },
    {
      county: 24025,
      diabetes: 9.2,
      obesity: 32.6,
    },
    {
      county: 24027,
      diabetes: 7.2,
      obesity: 24.4,
    },
    {
      county: 24029,
      diabetes: 9,
      obesity: 29.9,
    },
    {
      county: 24031,
      diabetes: 6.8,
      obesity: 21.6,
    },
    {
      county: 24033,
      diabetes: 11.9,
      obesity: 34.8,
    },
    {
      county: 24035,
      diabetes: 7.8,
      obesity: 29.1,
    },
    {
      county: 24037,
      diabetes: 10.6,
      obesity: 36.4,
    },
    {
      county: 24039,
      diabetes: 11.7,
      obesity: 34.7,
    },
    {
      county: 24041,
      diabetes: 7.4,
      obesity: 31.3,
    },
    {
      county: 24043,
      diabetes: 10.6,
      obesity: 36.3,
    },
    {
      county: 24045,
      diabetes: 11,
      obesity: 36.9,
    },
    {
      county: 24047,
      diabetes: 9.9,
      obesity: 31.5,
    },
    {
      county: 24510,
      diabetes: 12.5,
      obesity: 36.6,
    },
    {
      county: 25001,
      diabetes: 6.1,
      obesity: 23.1,
    },
    {
      county: 25003,
      diabetes: 8,
      obesity: 22.5,
    },
    {
      county: 25005,
      diabetes: 7.6,
      obesity: 27.3,
    },
    {
      county: 25007,
      diabetes: 7.2,
      obesity: 18.3,
    },
    {
      county: 25009,
      diabetes: 7,
      obesity: 26.6,
    },
    {
      county: 25011,
      diabetes: 6.7,
      obesity: 26.4,
    },
    {
      county: 25013,
      diabetes: 8.2,
      obesity: 30.2,
    },
    {
      county: 25015,
      diabetes: 6.3,
      obesity: 22,
    },
    {
      county: 25017,
      diabetes: 6.4,
      obesity: 20.4,
    },
    {
      county: 25019,
      diabetes: 7.1,
      obesity: 20.7,
    },
    {
      county: 25021,
      diabetes: 7.1,
      obesity: 22.8,
    },
    {
      county: 25023,
      diabetes: 6.7,
      obesity: 24.4,
    },
    {
      county: 25025,
      diabetes: 8.1,
      obesity: 21.3,
    },
    {
      county: 25027,
      diabetes: 8,
      obesity: 30.6,
    },
    {
      county: 26001,
      diabetes: 8,
      obesity: 19.5,
    },
    {
      county: 26003,
      diabetes: 7.8,
      obesity: 19.5,
    },
    {
      county: 26005,
      diabetes: 8.3,
      obesity: 29.9,
    },
    {
      county: 26007,
      diabetes: 8.4,
      obesity: 27.1,
    },
    {
      county: 26009,
      diabetes: 7.5,
      obesity: 26,
    },
    {
      county: 26011,
      diabetes: 6.9,
      obesity: 20.7,
    },
    {
      county: 26013,
      diabetes: 7.6,
      obesity: 22.1,
    },
    {
      county: 26015,
      diabetes: 8.3,
      obesity: 28.3,
    },
    {
      county: 26017,
      diabetes: 10.2,
      obesity: 33.6,
    },
    {
      county: 26019,
      diabetes: 8.3,
      obesity: 26,
    },
    {
      county: 26021,
      diabetes: 7.9,
      obesity: 33.4,
    },
    {
      county: 26023,
      diabetes: 9.8,
      obesity: 27.8,
    },
    {
      county: 26025,
      diabetes: 10.8,
      obesity: 37.6,
    },
    {
      county: 26027,
      diabetes: 8,
      obesity: 26,
    },
    {
      county: 26029,
      diabetes: 6.4,
      obesity: 26.2,
    },
    {
      county: 26031,
      diabetes: 8.6,
      obesity: 30.2,
    },
    {
      county: 26033,
      diabetes: 8.7,
      obesity: 26.3,
    },
    {
      county: 26035,
      diabetes: 10.1,
      obesity: 32.8,
    },
    {
      county: 26037,
      diabetes: 9.5,
      obesity: 29.6,
    },
    {
      county: 26039,
      diabetes: 7.2,
      obesity: 19.6,
    },
    {
      county: 26041,
      diabetes: 9.9,
      obesity: 32.5,
    },
    {
      county: 26043,
      diabetes: 7.5,
      obesity: 25.8,
    },
    {
      county: 26045,
      diabetes: 7.4,
      obesity: 32.4,
    },
    {
      county: 26047,
      diabetes: 6.7,
      obesity: 23.4,
    },
    {
      county: 26049,
      diabetes: 11.8,
      obesity: 38.7,
    },
    {
      county: 26051,
      diabetes: 8.4,
      obesity: 24.5,
    },
    {
      county: 26053,
      diabetes: 8.6,
      obesity: 22.8,
    },
    {
      county: 26055,
      diabetes: 7.2,
      obesity: 26.4,
    },
    {
      county: 26057,
      diabetes: 8.5,
      obesity: 35.5,
    },
    {
      county: 26059,
      diabetes: 7.7,
      obesity: 29.4,
    },
    {
      county: 26061,
      diabetes: 7.9,
      obesity: 22.1,
    },
    {
      county: 26063,
      diabetes: 8.6,
      obesity: 27.5,
    },
    {
      county: 26065,
      diabetes: 8.7,
      obesity: 30.5,
    },
    {
      county: 26067,
      diabetes: 10.1,
      obesity: 35.6,
    },
    {
      county: 26069,
      diabetes: 8.9,
      obesity: 29.7,
    },
    {
      county: 26071,
      diabetes: 7.5,
      obesity: 20.3,
    },
    {
      county: 26073,
      diabetes: 8.6,
      obesity: 32.3,
    },
    {
      county: 26075,
      diabetes: 9.6,
      obesity: 37.2,
    },
    {
      county: 26077,
      diabetes: 8.2,
      obesity: 35.5,
    },
    {
      county: 26079,
      diabetes: 8,
      obesity: 25.4,
    },
    {
      county: 26081,
      diabetes: 9.2,
      obesity: 32,
    },
    {
      county: 26083,
      diabetes: 6.9,
      obesity: 17.9,
    },
    {
      county: 26085,
      diabetes: 8.6,
      obesity: 24.1,
    },
    {
      county: 26087,
      diabetes: 8.4,
      obesity: 36.6,
    },
    {
      county: 26089,
      diabetes: 6.6,
      obesity: 23.2,
    },
    {
      county: 26091,
      diabetes: 10.5,
      obesity: 39.2,
    },
    {
      county: 26093,
      diabetes: 7.1,
      obesity: 30.1,
    },
    {
      county: 26095,
      diabetes: 7.2,
      obesity: 18.2,
    },
    {
      county: 26097,
      diabetes: 8.4,
      obesity: 25.4,
    },
    {
      county: 26099,
      diabetes: 10.1,
      obesity: 33.7,
    },
    {
      county: 26101,
      diabetes: 7.8,
      obesity: 23.2,
    },
    {
      county: 26103,
      diabetes: 7.2,
      obesity: 27.6,
    },
    {
      county: 26105,
      diabetes: 8.1,
      obesity: 28.2,
    },
    {
      county: 26107,
      diabetes: 8.5,
      obesity: 28.9,
    },
    {
      county: 26109,
      diabetes: 7.2,
      obesity: 26.8,
    },
    {
      county: 26111,
      diabetes: 6.3,
      obesity: 30.1,
    },
    {
      county: 26113,
      diabetes: 7.8,
      obesity: 24.9,
    },
    {
      county: 26115,
      diabetes: 9.1,
      obesity: 35.1,
    },
    {
      county: 26117,
      diabetes: 8.5,
      obesity: 37.2,
    },
    {
      county: 26119,
      diabetes: 7.8,
      obesity: 22.9,
    },
    {
      county: 26121,
      diabetes: 10.3,
      obesity: 36.7,
    },
    {
      county: 26123,
      diabetes: 7.8,
      obesity: 35.4,
    },
    {
      county: 26125,
      diabetes: 8.2,
      obesity: 30.1,
    },
    {
      county: 26127,
      diabetes: 10.1,
      obesity: 24.2,
    },
    {
      county: 26129,
      diabetes: 9,
      obesity: 23.3,
    },
    {
      county: 26131,
      diabetes: 7.1,
      obesity: 21.3,
    },
    {
      county: 26133,
      diabetes: 8.1,
      obesity: 23.7,
    },
    {
      county: 26135,
      diabetes: 7.3,
      obesity: 21.9,
    },
    {
      county: 26137,
      diabetes: 6.9,
      obesity: 24.1,
    },
    {
      county: 26139,
      diabetes: 8.2,
      obesity: 27.5,
    },
    {
      county: 26141,
      diabetes: 7.6,
      obesity: 23.4,
    },
    {
      county: 26143,
      diabetes: 7.4,
      obesity: 25,
    },
    {
      county: 26145,
      diabetes: 10.5,
      obesity: 41.8,
    },
    {
      county: 26147,
      diabetes: 9.2,
      obesity: 32.6,
    },
    {
      county: 26149,
      diabetes: 9.5,
      obesity: 25.6,
    },
    {
      county: 26151,
      diabetes: 7.6,
      obesity: 33.2,
    },
    {
      county: 26153,
      diabetes: 7.1,
      obesity: 19,
    },
    {
      county: 26155,
      diabetes: 7.2,
      obesity: 34.2,
    },
    {
      county: 26157,
      diabetes: 7.9,
      obesity: 28.6,
    },
    {
      county: 26159,
      diabetes: 9.1,
      obesity: 34,
    },
    {
      county: 26161,
      diabetes: 7.6,
      obesity: 26.9,
    },
    {
      county: 26163,
      diabetes: 10.5,
      obesity: 36,
    },
    {
      county: 26165,
      diabetes: 8.5,
      obesity: 28.8,
    },
    {
      county: 27001,
      diabetes: 7.4,
      obesity: 28.5,
    },
    {
      county: 27003,
      diabetes: 8.5,
      obesity: 32.7,
    },
    {
      county: 27005,
      diabetes: 7.4,
      obesity: 31.9,
    },
    {
      county: 27007,
      diabetes: 9.3,
      obesity: 35.6,
    },
    {
      county: 27009,
      diabetes: 8.5,
      obesity: 36.3,
    },
    {
      county: 27011,
      diabetes: 6.3,
      obesity: 27.2,
    },
    {
      county: 27013,
      diabetes: 8,
      obesity: 28.2,
    },
    {
      county: 27015,
      diabetes: 8.3,
      obesity: 34.8,
    },
    {
      county: 27017,
      diabetes: 9,
      obesity: 30.6,
    },
    {
      county: 27019,
      diabetes: 8.1,
      obesity: 26.7,
    },
    {
      county: 27021,
      diabetes: 7.5,
      obesity: 26.9,
    },
    {
      county: 27023,
      diabetes: 9.6,
      obesity: 32.8,
    },
    {
      county: 27025,
      diabetes: 7.6,
      obesity: 28.6,
    },
    {
      county: 27027,
      diabetes: 7.1,
      obesity: 34.4,
    },
    {
      county: 27029,
      diabetes: 7.5,
      obesity: 27.4,
    },
    {
      county: 27031,
      diabetes: 7.3,
      obesity: 23.8,
    },
    {
      county: 27033,
      diabetes: 8.3,
      obesity: 29.9,
    },
    {
      county: 27035,
      diabetes: 7.9,
      obesity: 31.8,
    },
    {
      county: 27037,
      diabetes: 7.5,
      obesity: 31.9,
    },
    {
      county: 27039,
      diabetes: 8.4,
      obesity: 31.3,
    },
    {
      county: 27041,
      diabetes: 6.3,
      obesity: 28.9,
    },
    {
      county: 27043,
      diabetes: 7.3,
      obesity: 34.2,
    },
    {
      county: 27045,
      diabetes: 9.1,
      obesity: 29.7,
    },
    {
      county: 27047,
      diabetes: 7.4,
      obesity: 29,
    },
    {
      county: 27049,
      diabetes: 6.9,
      obesity: 32,
    },
    {
      county: 27051,
      diabetes: 6.4,
      obesity: 29.3,
    },
    {
      county: 27053,
      diabetes: 7,
      obesity: 25.1,
    },
    {
      county: 27055,
      diabetes: 7,
      obesity: 26.6,
    },
    {
      county: 27057,
      diabetes: 7.4,
      obesity: 31.3,
    },
    {
      county: 27059,
      diabetes: 7.3,
      obesity: 32.7,
    },
    {
      county: 27061,
      diabetes: 10,
      obesity: 30.5,
    },
    {
      county: 27063,
      diabetes: 7.6,
      obesity: 23.6,
    },
    {
      county: 27065,
      diabetes: 7.9,
      obesity: 33.3,
    },
    {
      county: 27067,
      diabetes: 6.3,
      obesity: 31.2,
    },
    {
      county: 27069,
      diabetes: 7.7,
      obesity: 22.8,
    },
    {
      county: 27071,
      diabetes: 7.9,
      obesity: 27.1,
    },
    {
      county: 27073,
      diabetes: 8.8,
      obesity: 26.7,
    },
    {
      county: 27075,
      diabetes: 6.7,
      obesity: 31.3,
    },
    {
      county: 27077,
      diabetes: 7.7,
      obesity: 21.8,
    },
    {
      county: 27079,
      diabetes: 7.4,
      obesity: 30.6,
    },
    {
      county: 27081,
      diabetes: 8.3,
      obesity: 20,
    },
    {
      county: 27083,
      diabetes: 7.9,
      obesity: 31.1,
    },
    {
      county: 27085,
      diabetes: 7.5,
      obesity: 34.2,
    },
    {
      county: 27087,
      diabetes: 10.4,
      obesity: 28.7,
    },
    {
      county: 27089,
      diabetes: 8.3,
      obesity: 25.8,
    },
    {
      county: 27091,
      diabetes: 8.6,
      obesity: 31,
    },
    {
      county: 27093,
      diabetes: 6.9,
      obesity: 28.2,
    },
    {
      county: 27095,
      diabetes: 9,
      obesity: 30.9,
    },
    {
      county: 27097,
      diabetes: 8.8,
      obesity: 31.6,
    },
    {
      county: 27099,
      diabetes: 7.9,
      obesity: 31.6,
    },
    {
      county: 27101,
      diabetes: 6.4,
      obesity: 34.5,
    },
    {
      county: 27103,
      diabetes: 7.1,
      obesity: 27,
    },
    {
      county: 27105,
      diabetes: 9.4,
      obesity: 35.2,
    },
    {
      county: 27107,
      diabetes: 9,
      obesity: 34.7,
    },
    {
      county: 27109,
      diabetes: 7.1,
      obesity: 29.2,
    },
    {
      county: 27111,
      diabetes: 6.4,
      obesity: 30.7,
    },
    {
      county: 27113,
      diabetes: 6.9,
      obesity: 27.6,
    },
    {
      county: 27115,
      diabetes: 8.7,
      obesity: 32.6,
    },
    {
      county: 27117,
      diabetes: 6.2,
      obesity: 25.7,
    },
    {
      county: 27119,
      diabetes: 9.4,
      obesity: 33.8,
    },
    {
      county: 27121,
      diabetes: 7,
      obesity: 26.5,
    },
    {
      county: 27123,
      diabetes: 8.8,
      obesity: 30.7,
    },
    {
      county: 27125,
      diabetes: 9.2,
      obesity: 23.4,
    },
    {
      county: 27127,
      diabetes: 8.3,
      obesity: 35,
    },
    {
      county: 27129,
      diabetes: 7.8,
      obesity: 29.2,
    },
    {
      county: 27131,
      diabetes: 8.4,
      obesity: 30.2,
    },
    {
      county: 27133,
      diabetes: 7.3,
      obesity: 26.6,
    },
    {
      county: 27135,
      diabetes: 7,
      obesity: 28.9,
    },
    {
      county: 27137,
      diabetes: 7.7,
      obesity: 31,
    },
    {
      county: 27139,
      diabetes: 7,
      obesity: 31.2,
    },
    {
      county: 27141,
      diabetes: 7.5,
      obesity: 34.8,
    },
    {
      county: 27143,
      diabetes: 9.7,
      obesity: 29.6,
    },
    {
      county: 27145,
      diabetes: 7.3,
      obesity: 31.6,
    },
    {
      county: 27147,
      diabetes: 7.8,
      obesity: 32.6,
    },
    {
      county: 27149,
      diabetes: 7.3,
      obesity: 26.3,
    },
    {
      county: 27151,
      diabetes: 8.7,
      obesity: 31.6,
    },
    {
      county: 27153,
      diabetes: 8,
      obesity: 35.7,
    },
    {
      county: 27155,
      diabetes: 8.3,
      obesity: 22.4,
    },
    {
      county: 27157,
      diabetes: 7.8,
      obesity: 31.2,
    },
    {
      county: 27159,
      diabetes: 7.8,
      obesity: 30.3,
    },
    {
      county: 27161,
      diabetes: 7.7,
      obesity: 35.3,
    },
    {
      county: 27163,
      diabetes: 7.7,
      obesity: 28.1,
    },
    {
      county: 27165,
      diabetes: 6.5,
      obesity: 26.8,
    },
    {
      county: 27167,
      diabetes: 7.4,
      obesity: 25.9,
    },
    {
      county: 27169,
      diabetes: 7.9,
      obesity: 32.7,
    },
    {
      county: 27171,
      diabetes: 6.9,
      obesity: 31,
    },
    {
      county: 27173,
      diabetes: 7.2,
      obesity: 27.7,
    },
    {
      county: 28001,
      diabetes: 10.7,
      obesity: 38.4,
    },
    {
      county: 28003,
      diabetes: 9.6,
      obesity: 33.4,
    },
    {
      county: 28005,
      diabetes: 10.2,
      obesity: 31,
    },
    {
      county: 28007,
      diabetes: 9.9,
      obesity: 34,
    },
    {
      county: 28009,
      diabetes: 7.9,
      obesity: 18.7,
    },
    {
      county: 28011,
      diabetes: 14.6,
      obesity: 38,
    },
    {
      county: 28013,
      diabetes: 10.1,
      obesity: 27.5,
    },
    {
      county: 28015,
      diabetes: 9.2,
      obesity: 25.1,
    },
    {
      county: 28017,
      diabetes: 11.9,
      obesity: 32.4,
    },
    {
      county: 28019,
      diabetes: 10.7,
      obesity: 24.7,
    },
    {
      county: 28021,
      diabetes: 11.3,
      obesity: 20.1,
    },
    {
      county: 28023,
      diabetes: 11.9,
      obesity: 32.9,
    },
    {
      county: 28025,
      diabetes: 13.7,
      obesity: 42.5,
    },
    {
      county: 28027,
      diabetes: 12.9,
      obesity: 39.6,
    },
    {
      county: 28029,
      diabetes: 9.7,
      obesity: 29.5,
    },
    {
      county: 28031,
      diabetes: 9,
      obesity: 33.6,
    },
    {
      county: 28033,
      diabetes: 12.7,
      obesity: 37.3,
    },
    {
      county: 28035,
      diabetes: 11.4,
      obesity: 39.1,
    },
    {
      county: 28037,
      diabetes: 9.9,
      obesity: 27.6,
    },
    {
      county: 28039,
      diabetes: 7.8,
      obesity: 28.9,
    },
    {
      county: 28041,
      diabetes: 11.6,
      obesity: 33,
    },
    {
      county: 28043,
      diabetes: 11.7,
      obesity: 36.5,
    },
    {
      county: 28045,
      diabetes: 8.2,
      obesity: 26,
    },
    {
      county: 28047,
      diabetes: 11.5,
      obesity: 34.9,
    },
    {
      county: 28049,
      diabetes: 12.4,
      obesity: 40.5,
    },
    {
      county: 28051,
      diabetes: 14.9,
      obesity: 37.5,
    },
    {
      county: 28053,
      diabetes: 10.8,
      obesity: 26.3,
    },
    {
      county: 28055,
      diabetes: 7.9,
      obesity: 17,
    },
    {
      county: 28057,
      diabetes: 11.6,
      obesity: 31.9,
    },
    {
      county: 28059,
      diabetes: 10.3,
      obesity: 35.5,
    },
    {
      county: 28061,
      diabetes: 10,
      obesity: 37.4,
    },
    {
      county: 28063,
      diabetes: 9.8,
      obesity: 34.8,
    },
    {
      county: 28065,
      diabetes: 10,
      obesity: 33.9,
    },
    {
      county: 28067,
      diabetes: 13.4,
      obesity: 42.1,
    },
    {
      county: 28069,
      diabetes: 12.8,
      obesity: 31.4,
    },
    {
      county: 28071,
      diabetes: 9.1,
      obesity: 32.9,
    },
    {
      county: 28073,
      diabetes: 10.9,
      obesity: 35.7,
    },
    {
      county: 28075,
      diabetes: 13.1,
      obesity: 38.7,
    },
    {
      county: 28077,
      diabetes: 10.5,
      obesity: 28.7,
    },
    {
      county: 28079,
      diabetes: 11.5,
      obesity: 33.8,
    },
    {
      county: 28081,
      diabetes: 11.3,
      obesity: 36.3,
    },
    {
      county: 28083,
      diabetes: 11.8,
      obesity: 48.6,
    },
    {
      county: 28085,
      diabetes: 13,
      obesity: 39.1,
    },
    {
      county: 28087,
      diabetes: 10.6,
      obesity: 37.7,
    },
    {
      county: 28089,
      diabetes: 9.4,
      obesity: 28.5,
    },
    {
      county: 28091,
      diabetes: 12.2,
      obesity: 35.4,
    },
    {
      county: 28093,
      diabetes: 10.8,
      obesity: 30.7,
    },
    {
      county: 28095,
      diabetes: 11.8,
      obesity: 37.9,
    },
    {
      county: 28097,
      diabetes: 9.6,
      obesity: 27,
    },
    {
      county: 28099,
      diabetes: 13.3,
      obesity: 34.7,
    },
    {
      county: 28101,
      diabetes: 11.6,
      obesity: 37.4,
    },
    {
      county: 28103,
      diabetes: 11.6,
      obesity: 32.1,
    },
    {
      county: 28105,
      diabetes: 10.9,
      obesity: 32.3,
    },
    {
      county: 28107,
      diabetes: 12.4,
      obesity: 39.2,
    },
    {
      county: 28109,
      diabetes: 10.9,
      obesity: 30.2,
    },
    {
      county: 28111,
      diabetes: 9.3,
      obesity: 32.5,
    },
    {
      county: 28113,
      diabetes: 14.1,
      obesity: 39.3,
    },
    {
      county: 28115,
      diabetes: 10.3,
      obesity: 34.6,
    },
    {
      county: 28117,
      diabetes: 9.4,
      obesity: 27.5,
    },
    {
      county: 28119,
      diabetes: 10.2,
      obesity: 25.2,
    },
    {
      county: 28121,
      diabetes: 10.3,
      obesity: 33.4,
    },
    {
      county: 28123,
      diabetes: 14.4,
      obesity: 38.9,
    },
    {
      county: 28125,
      diabetes: 8.8,
      obesity: 18.6,
    },
    {
      county: 28127,
      diabetes: 8.3,
      obesity: 23.3,
    },
    {
      county: 28129,
      diabetes: 10.1,
      obesity: 35.6,
    },
    {
      county: 28131,
      diabetes: 9,
      obesity: 29.4,
    },
    {
      county: 28133,
      diabetes: 13,
      obesity: 42.5,
    },
    {
      county: 28135,
      diabetes: 11.6,
      obesity: 29.7,
    },
    {
      county: 28137,
      diabetes: 10.9,
      obesity: 36.4,
    },
    {
      county: 28139,
      diabetes: 11.2,
      obesity: 27.6,
    },
    {
      county: 28141,
      diabetes: 9.8,
      obesity: 35.3,
    },
    {
      county: 28143,
      diabetes: 8.9,
      obesity: 32.9,
    },
    {
      county: 28145,
      diabetes: 8.1,
      obesity: 31.9,
    },
    {
      county: 28147,
      diabetes: 12.2,
      obesity: 38.2,
    },
    {
      county: 28149,
      diabetes: 11,
      obesity: 29.5,
    },
    {
      county: 28151,
      diabetes: 13.8,
      obesity: 42.6,
    },
    {
      county: 28153,
      diabetes: 11.3,
      obesity: 26.4,
    },
    {
      county: 28155,
      diabetes: 8.8,
      obesity: 26.3,
    },
    {
      county: 28157,
      diabetes: 7.5,
      obesity: 24.2,
    },
    {
      county: 28159,
      diabetes: 13.4,
      obesity: 34.3,
    },
    {
      county: 28161,
      diabetes: 10.8,
      obesity: 31.4,
    },
    {
      county: 28163,
      diabetes: 8.4,
      obesity: 19.4,
    },
    {
      county: 29001,
      diabetes: 7.9,
      obesity: 33.7,
    },
    {
      county: 29003,
      diabetes: 7.1,
      obesity: 29.7,
    },
    {
      county: 29005,
      diabetes: 7.7,
      obesity: 25.2,
    },
    {
      county: 29007,
      diabetes: 9.5,
      obesity: 27.4,
    },
    {
      county: 29009,
      diabetes: 9.7,
      obesity: 23.2,
    },
    {
      county: 29011,
      diabetes: 6.9,
      obesity: 22.8,
    },
    {
      county: 29013,
      diabetes: 8.9,
      obesity: 37.3,
    },
    {
      county: 29015,
      diabetes: 9.4,
      obesity: 31.3,
    },
    {
      county: 29017,
      diabetes: 8.3,
      obesity: 23.5,
    },
    {
      county: 29019,
      diabetes: 7.4,
      obesity: 28.8,
    },
    {
      county: 29021,
      diabetes: 9.7,
      obesity: 32,
    },
    {
      county: 29023,
      diabetes: 9.7,
      obesity: 33.3,
    },
    {
      county: 29025,
      diabetes: 10.4,
      obesity: 34.7,
    },
    {
      county: 29027,
      diabetes: 7.8,
      obesity: 28.2,
    },
    {
      county: 29029,
      diabetes: 7.7,
      obesity: 32.1,
    },
    {
      county: 29031,
      diabetes: 8.9,
      obesity: 33.1,
    },
    {
      county: 29033,
      diabetes: 9.3,
      obesity: 29,
    },
    {
      county: 29035,
      diabetes: 7,
      obesity: 23.2,
    },
    {
      county: 29037,
      diabetes: 7.3,
      obesity: 31.5,
    },
    {
      county: 29039,
      diabetes: 6.6,
      obesity: 18.1,
    },
    {
      county: 29041,
      diabetes: 8,
      obesity: 30.9,
    },
    {
      county: 29043,
      diabetes: 7.4,
      obesity: 33.6,
    },
    {
      county: 29045,
      diabetes: 8.4,
      obesity: 29.6,
    },
    {
      county: 29047,
      diabetes: 8.7,
      obesity: 31.5,
    },
    {
      county: 29049,
      diabetes: 8.2,
      obesity: 32.4,
    },
    {
      county: 29051,
      diabetes: 8.7,
      obesity: 29.1,
    },
    {
      county: 29053,
      diabetes: 6.9,
      obesity: 25.2,
    },
    {
      county: 29055,
      diabetes: 7.5,
      obesity: 29.2,
    },
    {
      county: 29057,
      diabetes: 6.8,
      obesity: 19.9,
    },
    {
      county: 29059,
      diabetes: 7.3,
      obesity: 23,
    },
    {
      county: 29061,
      diabetes: 8.2,
      obesity: 33.1,
    },
    {
      county: 29063,
      diabetes: 7.9,
      obesity: 28.8,
    },
    {
      county: 29065,
      diabetes: 8.8,
      obesity: 22.5,
    },
    {
      county: 29067,
      diabetes: 6.8,
      obesity: 21,
    },
    {
      county: 29069,
      diabetes: 12.6,
      obesity: 37.4,
    },
    {
      county: 29071,
      diabetes: 10.1,
      obesity: 28.3,
    },
    {
      county: 29073,
      diabetes: 8.3,
      obesity: 20.8,
    },
    {
      county: 29075,
      diabetes: 7.3,
      obesity: 26,
    },
    {
      county: 29077,
      diabetes: 9.8,
      obesity: 32.1,
    },
    {
      county: 29079,
      diabetes: 9.2,
      obesity: 28.2,
    },
    {
      county: 29081,
      diabetes: 9.1,
      obesity: 28.3,
    },
    {
      county: 29083,
      diabetes: 9.5,
      obesity: 30.8,
    },
    {
      county: 29085,
      diabetes: 6.6,
      obesity: 20,
    },
    {
      county: 29087,
      diabetes: 7.7,
      obesity: 22.8,
    },
    {
      county: 29089,
      diabetes: 7.2,
      obesity: 18.4,
    },
    {
      county: 29091,
      diabetes: 9,
      obesity: 33.3,
    },
    {
      county: 29093,
      diabetes: 7.4,
      obesity: 25.7,
    },
    {
      county: 29095,
      diabetes: 10.3,
      obesity: 34,
    },
    {
      county: 29097,
      diabetes: 10.2,
      obesity: 34.2,
    },
    {
      county: 29099,
      diabetes: 9.4,
      obesity: 36.9,
    },
    {
      county: 29101,
      diabetes: 7.8,
      obesity: 34.9,
    },
    {
      county: 29103,
      diabetes: 7.3,
      obesity: 26.8,
    },
    {
      county: 29105,
      diabetes: 7,
      obesity: 34.9,
    },
    {
      county: 29107,
      diabetes: 9.5,
      obesity: 36.2,
    },
    {
      county: 29109,
      diabetes: 8.1,
      obesity: 19.6,
    },
    {
      county: 29111,
      diabetes: 7.9,
      obesity: 29.5,
    },
    {
      county: 29113,
      diabetes: 8.6,
      obesity: 29.7,
    },
    {
      county: 29115,
      diabetes: 8.1,
      obesity: 26.3,
    },
    {
      county: 29117,
      diabetes: 9.5,
      obesity: 31.4,
    },
    {
      county: 29119,
      diabetes: 9.8,
      obesity: 26.1,
    },
    {
      county: 29121,
      diabetes: 8.4,
      obesity: 32.9,
    },
    {
      county: 29123,
      diabetes: 6.5,
      obesity: 24.1,
    },
    {
      county: 29125,
      diabetes: 7.7,
      obesity: 24.5,
    },
    {
      county: 29127,
      diabetes: 9.5,
      obesity: 35.7,
    },
    {
      county: 29129,
      diabetes: 8,
      obesity: 21.1,
    },
    {
      county: 29131,
      diabetes: 8.4,
      obesity: 28,
    },
    {
      county: 29133,
      diabetes: 11,
      obesity: 35.6,
    },
    {
      county: 29135,
      diabetes: 7.1,
      obesity: 19.2,
    },
    {
      county: 29137,
      diabetes: 7.3,
      obesity: 24.8,
    },
    {
      county: 29139,
      diabetes: 7.4,
      obesity: 20.7,
    },
    {
      county: 29141,
      diabetes: 6.9,
      obesity: 20.8,
    },
    {
      county: 29143,
      diabetes: 11.5,
      obesity: 37.2,
    },
    {
      county: 29145,
      diabetes: 9.6,
      obesity: 24.4,
    },
    {
      county: 29147,
      diabetes: 8.1,
      obesity: 33.1,
    },
    {
      county: 29149,
      diabetes: 8.1,
      obesity: 21.1,
    },
    {
      county: 29151,
      diabetes: 7.7,
      obesity: 25.4,
    },
    {
      county: 29153,
      diabetes: 7.2,
      obesity: 23,
    },
    {
      county: 29155,
      diabetes: 13.3,
      obesity: 33.9,
    },
    {
      county: 29157,
      diabetes: 8.5,
      obesity: 30.9,
    },
    {
      county: 29159,
      diabetes: 8.5,
      obesity: 32.3,
    },
    {
      county: 29161,
      diabetes: 8.1,
      obesity: 27.2,
    },
    {
      county: 29163,
      diabetes: 8.5,
      obesity: 35.6,
    },
    {
      county: 29165,
      diabetes: 8.4,
      obesity: 28.1,
    },
    {
      county: 29167,
      diabetes: 8.6,
      obesity: 24.3,
    },
    {
      county: 29169,
      diabetes: 7.5,
      obesity: 29.5,
    },
    {
      county: 29171,
      diabetes: 7.7,
      obesity: 22.3,
    },
    {
      county: 29173,
      diabetes: 7.3,
      obesity: 25.8,
    },
    {
      county: 29175,
      diabetes: 10.9,
      obesity: 34.4,
    },
    {
      county: 29177,
      diabetes: 7.5,
      obesity: 29.7,
    },
    {
      county: 29179,
      diabetes: 6.7,
      obesity: 20.3,
    },
    {
      county: 29181,
      diabetes: 8.7,
      obesity: 31,
    },
    {
      county: 29183,
      diabetes: 7.2,
      obesity: 30.9,
    },
    {
      county: 29185,
      diabetes: 6.6,
      obesity: 20.7,
    },
    {
      county: 29186,
      diabetes: 8.5,
      obesity: 27.1,
    },
    {
      county: 29187,
      diabetes: 8.3,
      obesity: 31.7,
    },
    {
      county: 29189,
      diabetes: 8,
      obesity: 28.9,
    },
    {
      county: 29195,
      diabetes: 8.6,
      obesity: 36,
    },
    {
      county: 29197,
      diabetes: 7.4,
      obesity: 23.4,
    },
    {
      county: 29199,
      diabetes: 7.3,
      obesity: 23.1,
    },
    {
      county: 29201,
      diabetes: 12,
      obesity: 42.2,
    },
    {
      county: 29203,
      diabetes: 8.5,
      obesity: 22.4,
    },
    {
      county: 29205,
      diabetes: 6.7,
      obesity: 25,
    },
    {
      county: 29207,
      diabetes: 11.6,
      obesity: 36,
    },
    {
      county: 29209,
      diabetes: 7.8,
      obesity: 27.8,
    },
    {
      county: 29211,
      diabetes: 8.5,
      obesity: 27.9,
    },
    {
      county: 29213,
      diabetes: 8.8,
      obesity: 28,
    },
    {
      county: 29215,
      diabetes: 8.3,
      obesity: 29,
    },
    {
      county: 29217,
      diabetes: 7.6,
      obesity: 22.3,
    },
    {
      county: 29219,
      diabetes: 7.8,
      obesity: 30.2,
    },
    {
      county: 29221,
      diabetes: 8.9,
      obesity: 27.8,
    },
    {
      county: 29223,
      diabetes: 12,
      obesity: 29.6,
    },
    {
      county: 29225,
      diabetes: 9.2,
      obesity: 30.3,
    },
    {
      county: 29227,
      diabetes: 6.9,
      obesity: 22,
    },
    {
      county: 29229,
      diabetes: 7.5,
      obesity: 27.1,
    },
    {
      county: 29510,
      diabetes: 10.8,
      obesity: 35.8,
    },
    {
      county: 30001,
      diabetes: 6.9,
      obesity: 24.5,
    },
    {
      county: 30003,
      diabetes: 13,
      obesity: 32.7,
    },
    {
      county: 30005,
      diabetes: 10,
      obesity: 33.8,
    },
    {
      county: 30007,
      diabetes: 6.9,
      obesity: 28.5,
    },
    {
      county: 30009,
      diabetes: 8,
      obesity: 24.3,
    },
    {
      county: 30011,
      diabetes: 6.4,
      obesity: 20,
    },
    {
      county: 30013,
      diabetes: 8.9,
      obesity: 34.8,
    },
    {
      county: 30015,
      diabetes: 7,
      obesity: 25.9,
    },
    {
      county: 30017,
      diabetes: 9.3,
      obesity: 32.6,
    },
    {
      county: 30019,
      diabetes: 8.1,
      obesity: 23.8,
    },
    {
      county: 30021,
      diabetes: 9.3,
      obesity: 36.4,
    },
    {
      county: 30023,
      diabetes: 7.6,
      obesity: 25.2,
    },
    {
      county: 30025,
      diabetes: 5.8,
      obesity: 20.6,
    },
    {
      county: 30027,
      diabetes: 5.8,
      obesity: 25,
    },
    {
      county: 30029,
      diabetes: 5.4,
      obesity: 25.9,
    },
    {
      county: 30031,
      diabetes: 4.3,
      obesity: 16.9,
    },
    {
      county: 30033,
      diabetes: 6.7,
      obesity: 17.6,
    },
    {
      county: 30035,
      diabetes: 13.3,
      obesity: 38.5,
    },
    {
      county: 30037,
      diabetes: 7.3,
      obesity: 19.9,
    },
    {
      county: 30039,
      diabetes: 6.3,
      obesity: 25.5,
    },
    {
      county: 30041,
      diabetes: 8.6,
      obesity: 37,
    },
    {
      county: 30043,
      diabetes: 8.2,
      obesity: 25.3,
    },
    {
      county: 30045,
      diabetes: 6.1,
      obesity: 23,
    },
    {
      county: 30047,
      diabetes: 8.6,
      obesity: 31.5,
    },
    {
      county: 30049,
      diabetes: 7.7,
      obesity: 25.9,
    },
    {
      county: 30051,
      diabetes: 7.2,
      obesity: 27.1,
    },
    {
      county: 30053,
      diabetes: 9,
      obesity: 30.1,
    },
    {
      county: 30055,
      diabetes: 6.5,
      obesity: 26.2,
    },
    {
      county: 30057,
      diabetes: 6,
      obesity: 21.5,
    },
    {
      county: 30059,
      diabetes: 6.8,
      obesity: 21.4,
    },
    {
      county: 30061,
      diabetes: 6.5,
      obesity: 24.8,
    },
    {
      county: 30063,
      diabetes: 5.5,
      obesity: 23.9,
    },
    {
      county: 30065,
      diabetes: 6.7,
      obesity: 25.6,
    },
    {
      county: 30067,
      diabetes: 5.7,
      obesity: 18.6,
    },
    {
      county: 30069,
      diabetes: 7.3,
      obesity: 19,
    },
    {
      county: 30071,
      diabetes: 7.9,
      obesity: 24.4,
    },
    {
      county: 30073,
      diabetes: 9.1,
      obesity: 29.3,
    },
    {
      county: 30075,
      diabetes: 9.5,
      obesity: 20,
    },
    {
      county: 30077,
      diabetes: 7.3,
      obesity: 27,
    },
    {
      county: 30079,
      diabetes: 6.9,
      obesity: 18.8,
    },
    {
      county: 30081,
      diabetes: 7,
      obesity: 27,
    },
    {
      county: 30083,
      diabetes: 8.3,
      obesity: 38.7,
    },
    {
      county: 30085,
      diabetes: 14.7,
      obesity: 35.8,
    },
    {
      county: 30087,
      diabetes: 10.1,
      obesity: 32.7,
    },
    {
      county: 30089,
      diabetes: 7,
      obesity: 22.9,
    },
    {
      county: 30091,
      diabetes: 9,
      obesity: 26.5,
    },
    {
      county: 30093,
      diabetes: 9.8,
      obesity: 28.2,
    },
    {
      county: 30095,
      diabetes: 6.8,
      obesity: 28.8,
    },
    {
      county: 30097,
      diabetes: 6.5,
      obesity: 24.7,
    },
    {
      county: 30099,
      diabetes: 6.2,
      obesity: 23.9,
    },
    {
      county: 30101,
      diabetes: 7.7,
      obesity: 23.7,
    },
    {
      county: 30103,
      diabetes: 7.3,
      obesity: 18.4,
    },
    {
      county: 30105,
      diabetes: 8.5,
      obesity: 31.1,
    },
    {
      county: 30107,
      diabetes: 7,
      obesity: 19.4,
    },
    {
      county: 30109,
      diabetes: 7.4,
      obesity: 19.9,
    },
    {
      county: 30111,
      diabetes: 8.1,
      obesity: 31.3,
    },
    {
      county: 31001,
      diabetes: 10,
      obesity: 36.9,
    },
    {
      county: 31003,
      diabetes: 8.3,
      obesity: 28.3,
    },
    {
      county: 31005,
      diabetes: 6.9,
      obesity: 23.4,
    },
    {
      county: 31007,
      diabetes: 7,
      obesity: 18.7,
    },
    {
      county: 31009,
      diabetes: 6.9,
      obesity: 20.9,
    },
    {
      county: 31011,
      diabetes: 7.7,
      obesity: 32.1,
    },
    {
      county: 31013,
      diabetes: 7,
      obesity: 33.3,
    },
    {
      county: 31015,
      diabetes: 7.8,
      obesity: 32.2,
    },
    {
      county: 31017,
      diabetes: 9.1,
      obesity: 27.1,
    },
    {
      county: 31019,
      diabetes: 8.8,
      obesity: 30.6,
    },
    {
      county: 31021,
      diabetes: 8.3,
      obesity: 30.2,
    },
    {
      county: 31023,
      diabetes: 7.6,
      obesity: 32.8,
    },
    {
      county: 31025,
      diabetes: 9,
      obesity: 37.1,
    },
    {
      county: 31027,
      diabetes: 5.9,
      obesity: 34.5,
    },
    {
      county: 31029,
      diabetes: 9.1,
      obesity: 33,
    },
    {
      county: 31031,
      diabetes: 7.5,
      obesity: 26.7,
    },
    {
      county: 31033,
      diabetes: 7.3,
      obesity: 29.8,
    },
    {
      county: 31035,
      diabetes: 6.2,
      obesity: 35.8,
    },
    {
      county: 31037,
      diabetes: 8,
      obesity: 30.1,
    },
    {
      county: 31039,
      diabetes: 8,
      obesity: 35.5,
    },
    {
      county: 31041,
      diabetes: 7.6,
      obesity: 32.3,
    },
    {
      county: 31043,
      diabetes: 12.3,
      obesity: 40,
    },
    {
      county: 31045,
      diabetes: 6.4,
      obesity: 22.6,
    },
    {
      county: 31047,
      diabetes: 8.6,
      obesity: 32.8,
    },
    {
      county: 31049,
      diabetes: 6.3,
      obesity: 24.1,
    },
    {
      county: 31051,
      diabetes: 8.3,
      obesity: 36.5,
    },
    {
      county: 31053,
      diabetes: 9,
      obesity: 39,
    },
    {
      county: 31055,
      diabetes: 9.6,
      obesity: 32.8,
    },
    {
      county: 31057,
      diabetes: 8.4,
      obesity: 27.1,
    },
    {
      county: 31059,
      diabetes: 8.3,
      obesity: 33.7,
    },
    {
      county: 31061,
      diabetes: 7,
      obesity: 25.2,
    },
    {
      county: 31063,
      diabetes: 7.3,
      obesity: 35.7,
    },
    {
      county: 31065,
      diabetes: 8.7,
      obesity: 33.2,
    },
    {
      county: 31067,
      diabetes: 8.7,
      obesity: 35,
    },
    {
      county: 31069,
      diabetes: 7,
      obesity: 24.4,
    },
    {
      county: 31071,
      diabetes: 6.9,
      obesity: 30.3,
    },
    {
      county: 31073,
      diabetes: 7.4,
      obesity: 23.1,
    },
    {
      county: 31075,
      diabetes: 7.5,
      obesity: 21.7,
    },
    {
      county: 31077,
      diabetes: 6.9,
      obesity: 27.3,
    },
    {
      county: 31079,
      diabetes: 9.2,
      obesity: 39.3,
    },
    {
      county: 31081,
      diabetes: 8.8,
      obesity: 33.3,
    },
    {
      county: 31083,
      diabetes: 6.6,
      obesity: 25.5,
    },
    {
      county: 31085,
      diabetes: 7.4,
      obesity: 24.2,
    },
    {
      county: 31087,
      diabetes: 8.1,
      obesity: 33.7,
    },
    {
      county: 31089,
      diabetes: 7.3,
      obesity: 35.6,
    },
    {
      county: 31091,
      diabetes: 6.7,
      obesity: 21.4,
    },
    {
      county: 31093,
      diabetes: 7.5,
      obesity: 31.9,
    },
    {
      county: 31095,
      diabetes: 7.4,
      obesity: 30.6,
    },
    {
      county: 31097,
      diabetes: 5.5,
      obesity: 27,
    },
    {
      county: 31099,
      diabetes: 8.2,
      obesity: 24.9,
    },
    {
      county: 31101,
      diabetes: 5.8,
      obesity: 27.4,
    },
    {
      county: 31103,
      diabetes: 7.8,
      obesity: 23.9,
    },
    {
      county: 31105,
      diabetes: 8.7,
      obesity: 22.3,
    },
    {
      county: 31107,
      diabetes: 8.4,
      obesity: 33.8,
    },
    {
      county: 31109,
      diabetes: 8,
      obesity: 31.6,
    },
    {
      county: 31111,
      diabetes: 10,
      obesity: 39.5,
    },
    {
      county: 31113,
      diabetes: 7.7,
      obesity: 19.8,
    },
    {
      county: 31115,
      diabetes: 9.7,
      obesity: 20.4,
    },
    {
      county: 31117,
      diabetes: 6.8,
      obesity: 20.4,
    },
    {
      county: 31119,
      diabetes: 6.6,
      obesity: 35.3,
    },
    {
      county: 31121,
      diabetes: 9,
      obesity: 31.2,
    },
    {
      county: 31123,
      diabetes: 8.8,
      obesity: 27.1,
    },
    {
      county: 31125,
      diabetes: 7.4,
      obesity: 31,
    },
    {
      county: 31127,
      diabetes: 6.9,
      obesity: 34.2,
    },
    {
      county: 31129,
      diabetes: 6.9,
      obesity: 32.5,
    },
    {
      county: 31131,
      diabetes: 8,
      obesity: 40.2,
    },
    {
      county: 31133,
      diabetes: 6.9,
      obesity: 34.8,
    },
    {
      county: 31135,
      diabetes: 6.9,
      obesity: 30.4,
    },
    {
      county: 31137,
      diabetes: 8.3,
      obesity: 31,
    },
    {
      county: 31139,
      diabetes: 8.4,
      obesity: 30.7,
    },
    {
      county: 31141,
      diabetes: 9.2,
      obesity: 35.3,
    },
    {
      county: 31143,
      diabetes: 6.7,
      obesity: 28,
    },
    {
      county: 31145,
      diabetes: 9.4,
      obesity: 36.3,
    },
    {
      county: 31147,
      diabetes: 8.9,
      obesity: 39.5,
    },
    {
      county: 31149,
      diabetes: 9.2,
      obesity: 33.1,
    },
    {
      county: 31151,
      diabetes: 10,
      obesity: 35.3,
    },
    {
      county: 31153,
      diabetes: 9,
      obesity: 33.6,
    },
    {
      county: 31155,
      diabetes: 8.8,
      obesity: 31.9,
    },
    {
      county: 31157,
      diabetes: 10.1,
      obesity: 36.7,
    },
    {
      county: 31159,
      diabetes: 7,
      obesity: 33.4,
    },
    {
      county: 31161,
      diabetes: 7.2,
      obesity: 32.7,
    },
    {
      county: 31163,
      diabetes: 7.8,
      obesity: 29.9,
    },
    {
      county: 31165,
      diabetes: 6,
      obesity: 20.5,
    },
    {
      county: 31167,
      diabetes: 7.5,
      obesity: 31.1,
    },
    {
      county: 31169,
      diabetes: 8.7,
      obesity: 34.3,
    },
    {
      county: 31171,
      diabetes: 7,
      obesity: 23.8,
    },
    {
      county: 31173,
      diabetes: 12.3,
      obesity: 43.1,
    },
    {
      county: 31175,
      diabetes: 7.2,
      obesity: 30.5,
    },
    {
      county: 31177,
      diabetes: 8,
      obesity: 31,
    },
    {
      county: 31179,
      diabetes: 7.7,
      obesity: 33.9,
    },
    {
      county: 31181,
      diabetes: 7.2,
      obesity: 33.1,
    },
    {
      county: 31183,
      diabetes: 6.7,
      obesity: 21.5,
    },
    {
      county: 31185,
      diabetes: 9.5,
      obesity: 38.8,
    },
    {
      county: 32001,
      diabetes: 12.9,
      obesity: 29.4,
    },
    {
      county: 32003,
      diabetes: 10,
      obesity: 30.2,
    },
    {
      county: 32005,
      diabetes: 6.9,
      obesity: 28.3,
    },
    {
      county: 32007,
      diabetes: 8.3,
      obesity: 30.8,
    },
    {
      county: 32009,
      diabetes: 7,
      obesity: 17.3,
    },
    {
      county: 32011,
      diabetes: 7,
      obesity: 18.3,
    },
    {
      county: 32013,
      diabetes: 7.8,
      obesity: 28.7,
    },
    {
      county: 32015,
      diabetes: 8,
      obesity: 25,
    },
    {
      county: 32017,
      diabetes: 8.8,
      obesity: 20,
    },
    {
      county: 32019,
      diabetes: 8.5,
      obesity: 33.8,
    },
    {
      county: 32021,
      diabetes: 7.8,
      obesity: 23.6,
    },
    {
      county: 32023,
      diabetes: 8.2,
      obesity: 30.6,
    },
    {
      county: 32027,
      diabetes: 7.5,
      obesity: 21.1,
    },
    {
      county: 32029,
      diabetes: 8,
      obesity: 17.8,
    },
    {
      county: 32031,
      diabetes: 6.3,
      obesity: 25.5,
    },
    {
      county: 32033,
      diabetes: 8.8,
      obesity: 22.8,
    },
    {
      county: 32510,
      diabetes: 8.9,
      obesity: 31.5,
    },
    {
      county: 33001,
      diabetes: 8.3,
      obesity: 33.4,
    },
    {
      county: 33003,
      diabetes: 7.1,
      obesity: 26.2,
    },
    {
      county: 33005,
      diabetes: 7.3,
      obesity: 31.9,
    },
    {
      county: 33007,
      diabetes: 9.8,
      obesity: 35.8,
    },
    {
      county: 33009,
      diabetes: 6.7,
      obesity: 27.8,
    },
    {
      county: 33011,
      diabetes: 8.1,
      obesity: 30.7,
    },
    {
      county: 33013,
      diabetes: 6.7,
      obesity: 29.9,
    },
    {
      county: 33015,
      diabetes: 7.1,
      obesity: 28.3,
    },
    {
      county: 33017,
      diabetes: 9.1,
      obesity: 29.4,
    },
    {
      county: 33019,
      diabetes: 8.2,
      obesity: 31.2,
    },
    {
      county: 34001,
      diabetes: 10.4,
      obesity: 29.5,
    },
    {
      county: 34003,
      diabetes: 7,
      obesity: 22.7,
    },
    {
      county: 34005,
      diabetes: 9.7,
      obesity: 30.2,
    },
    {
      county: 34007,
      diabetes: 8.7,
      obesity: 30.1,
    },
    {
      county: 34009,
      diabetes: 7.9,
      obesity: 28.3,
    },
    {
      county: 34011,
      diabetes: 9.1,
      obesity: 34.8,
    },
    {
      county: 34013,
      diabetes: 8.8,
      obesity: 27.6,
    },
    {
      county: 34015,
      diabetes: 7.7,
      obesity: 32,
    },
    {
      county: 34017,
      diabetes: 9.5,
      obesity: 23.9,
    },
    {
      county: 34019,
      diabetes: 5.4,
      obesity: 23.4,
    },
    {
      county: 34021,
      diabetes: 7.9,
      obesity: 27.7,
    },
    {
      county: 34023,
      diabetes: 8.5,
      obesity: 23.3,
    },
    {
      county: 34025,
      diabetes: 7.4,
      obesity: 21.4,
    },
    {
      county: 34027,
      diabetes: 6.2,
      obesity: 18.8,
    },
    {
      county: 34029,
      diabetes: 7.3,
      obesity: 29.8,
    },
    {
      county: 34031,
      diabetes: 10.1,
      obesity: 28.6,
    },
    {
      county: 34033,
      diabetes: 9.8,
      obesity: 34.7,
    },
    {
      county: 34035,
      diabetes: 6.6,
      obesity: 23.4,
    },
    {
      county: 34037,
      diabetes: 8,
      obesity: 27.6,
    },
    {
      county: 34039,
      diabetes: 7.2,
      obesity: 27.1,
    },
    {
      county: 34041,
      diabetes: 6.8,
      obesity: 30.3,
    },
    {
      county: 35001,
      diabetes: 7.4,
      obesity: 24.9,
    },
    {
      county: 35003,
      diabetes: 8.3,
      obesity: 15.9,
    },
    {
      county: 35005,
      diabetes: 9,
      obesity: 32.6,
    },
    {
      county: 35006,
      diabetes: 12.5,
      obesity: 37.3,
    },
    {
      county: 35007,
      diabetes: 9.2,
      obesity: 24.6,
    },
    {
      county: 35009,
      diabetes: 10.4,
      obesity: 32.9,
    },
    {
      county: 35011,
      diabetes: 8.3,
      obesity: 23.1,
    },
    {
      county: 35013,
      diabetes: 9.2,
      obesity: 29,
    },
    {
      county: 35015,
      diabetes: 11.3,
      obesity: 39.8,
    },
    {
      county: 35017,
      diabetes: 7.1,
      obesity: 26.3,
    },
    {
      county: 35019,
      diabetes: 9,
      obesity: 23.3,
    },
    {
      county: 35021,
      diabetes: 7,
      obesity: 17.7,
    },
    {
      county: 35023,
      diabetes: 7.3,
      obesity: 18.8,
    },
    {
      county: 35025,
      diabetes: 12,
      obesity: 37.5,
    },
    {
      county: 35027,
      diabetes: 6,
      obesity: 25.6,
    },
    {
      county: 35028,
      diabetes: 6.1,
      obesity: 20.6,
    },
    {
      county: 35029,
      diabetes: 11,
      obesity: 30.4,
    },
    {
      county: 35031,
      diabetes: 14.6,
      obesity: 39.8,
    },
    {
      county: 35033,
      diabetes: 7.9,
      obesity: 20.2,
    },
    {
      county: 35035,
      diabetes: 9.4,
      obesity: 29.4,
    },
    {
      county: 35037,
      diabetes: 8.3,
      obesity: 22.8,
    },
    {
      county: 35039,
      diabetes: 10.8,
      obesity: 29.9,
    },
    {
      county: 35041,
      diabetes: 7,
      obesity: 30.9,
    },
    {
      county: 35043,
      diabetes: 7.5,
      obesity: 27.7,
    },
    {
      county: 35045,
      diabetes: 11.5,
      obesity: 33.6,
    },
    {
      county: 35047,
      diabetes: 10,
      obesity: 28.8,
    },
    {
      county: 35049,
      diabetes: 5.3,
      obesity: 19.1,
    },
    {
      county: 35051,
      diabetes: 9,
      obesity: 27.9,
    },
    {
      county: 35053,
      diabetes: 8.5,
      obesity: 28.2,
    },
    {
      county: 35055,
      diabetes: 6.7,
      obesity: 17.4,
    },
    {
      county: 35057,
      diabetes: 7.8,
      obesity: 24.7,
    },
    {
      county: 35059,
      diabetes: 7.8,
      obesity: 20.9,
    },
    {
      county: 35061,
      diabetes: 8,
      obesity: 32.7,
    },
    {
      county: 36001,
      diabetes: 7.7,
      obesity: 25.8,
    },
    {
      county: 36003,
      diabetes: 9.1,
      obesity: 31.6,
    },
    {
      county: 36005,
      diabetes: 11.5,
      obesity: 29.6,
    },
    {
      county: 36007,
      diabetes: 9.3,
      obesity: 35,
    },
    {
      county: 36009,
      diabetes: 11.6,
      obesity: 34.6,
    },
    {
      county: 36011,
      diabetes: 8.2,
      obesity: 32.2,
    },
    {
      county: 36013,
      diabetes: 9.9,
      obesity: 34.8,
    },
    {
      county: 36015,
      diabetes: 10.8,
      obesity: 32.7,
    },
    {
      county: 36017,
      diabetes: 8.6,
      obesity: 31.8,
    },
    {
      county: 36019,
      diabetes: 11.1,
      obesity: 33.8,
    },
    {
      county: 36021,
      diabetes: 7.6,
      obesity: 29.2,
    },
    {
      county: 36023,
      diabetes: 8.6,
      obesity: 28,
    },
    {
      county: 36025,
      diabetes: 7.4,
      obesity: 31.9,
    },
    {
      county: 36027,
      diabetes: 7.2,
      obesity: 28.3,
    },
    {
      county: 36029,
      diabetes: 9.3,
      obesity: 29,
    },
    {
      county: 36031,
      diabetes: 8.5,
      obesity: 28.2,
    },
    {
      county: 36033,
      diabetes: 11.9,
      obesity: 41.3,
    },
    {
      county: 36035,
      diabetes: 9.6,
      obesity: 30.4,
    },
    {
      county: 36037,
      diabetes: 9.7,
      obesity: 27.8,
    },
    {
      county: 36039,
      diabetes: 7.5,
      obesity: 32.8,
    },
    {
      county: 36041,
      diabetes: 7.8,
      obesity: 25.5,
    },
    {
      county: 36043,
      diabetes: 8.9,
      obesity: 32.8,
    },
    {
      county: 36045,
      diabetes: 9.7,
      obesity: 33.6,
    },
    {
      county: 36047,
      diabetes: 9.2,
      obesity: 23.9,
    },
    {
      county: 36049,
      diabetes: 9.7,
      obesity: 32.2,
    },
    {
      county: 36051,
      diabetes: 8.2,
      obesity: 30.8,
    },
    {
      county: 36053,
      diabetes: 8.3,
      obesity: 31.8,
    },
    {
      county: 36055,
      diabetes: 8,
      obesity: 32,
    },
    {
      county: 36057,
      diabetes: 11.4,
      obesity: 34.1,
    },
    {
      county: 36059,
      diabetes: 6.9,
      obesity: 23.3,
    },
    {
      county: 36061,
      diabetes: 6.5,
      obesity: 17.4,
    },
    {
      county: 36063,
      diabetes: 9.3,
      obesity: 28.9,
    },
    {
      county: 36065,
      diabetes: 9.2,
      obesity: 30.7,
    },
    {
      county: 36067,
      diabetes: 8.8,
      obesity: 30.7,
    },
    {
      county: 36069,
      diabetes: 7.3,
      obesity: 29.2,
    },
    {
      county: 36071,
      diabetes: 8.5,
      obesity: 27.8,
    },
    {
      county: 36073,
      diabetes: 9.6,
      obesity: 31.4,
    },
    {
      county: 36075,
      diabetes: 9.4,
      obesity: 37.2,
    },
    {
      county: 36077,
      diabetes: 8.3,
      obesity: 30.4,
    },
    {
      county: 36079,
      diabetes: 6.1,
      obesity: 22.7,
    },
    {
      county: 36081,
      diabetes: 10.7,
      obesity: 24.8,
    },
    {
      county: 36083,
      diabetes: 8.3,
      obesity: 27.1,
    },
    {
      county: 36085,
      diabetes: 8.7,
      obesity: 29.4,
    },
    {
      county: 36087,
      diabetes: 7.9,
      obesity: 24.3,
    },
    {
      county: 36089,
      diabetes: 9.8,
      obesity: 36.4,
    },
    {
      county: 36091,
      diabetes: 6.6,
      obesity: 27.9,
    },
    {
      county: 36093,
      diabetes: 8.8,
      obesity: 30,
    },
    {
      county: 36095,
      diabetes: 8.1,
      obesity: 34.3,
    },
    {
      county: 36097,
      diabetes: 9.2,
      obesity: 29.9,
    },
    {
      county: 36099,
      diabetes: 9,
      obesity: 33.8,
    },
    {
      county: 36101,
      diabetes: 10.3,
      obesity: 33.8,
    },
    {
      county: 36103,
      diabetes: 7,
      obesity: 25.6,
    },
    {
      county: 36105,
      diabetes: 7.9,
      obesity: 34.4,
    },
    {
      county: 36107,
      diabetes: 9.5,
      obesity: 28.5,
    },
    {
      county: 36109,
      diabetes: 6.7,
      obesity: 22.7,
    },
    {
      county: 36111,
      diabetes: 6.9,
      obesity: 26.8,
    },
    {
      county: 36113,
      diabetes: 6.8,
      obesity: 28.7,
    },
    {
      county: 36115,
      diabetes: 8.3,
      obesity: 31.4,
    },
    {
      county: 36117,
      diabetes: 8.7,
      obesity: 33.2,
    },
    {
      county: 36119,
      diabetes: 6.6,
      obesity: 20.2,
    },
    {
      county: 36121,
      diabetes: 9.1,
      obesity: 33.4,
    },
    {
      county: 36123,
      diabetes: 10.5,
      obesity: 28.1,
    },
    {
      county: 37001,
      diabetes: 9.6,
      obesity: 32.1,
    },
    {
      county: 37003,
      diabetes: 7.1,
      obesity: 21,
    },
    {
      county: 37005,
      diabetes: 7.5,
      obesity: 17.4,
    },
    {
      county: 37007,
      diabetes: 8.6,
      obesity: 18.5,
    },
    {
      county: 37009,
      diabetes: 8.4,
      obesity: 23.6,
    },
    {
      county: 37011,
      diabetes: 7.3,
      obesity: 22.2,
    },
    {
      county: 37013,
      diabetes: 8.4,
      obesity: 24.9,
    },
    {
      county: 37015,
      diabetes: 9.8,
      obesity: 22.6,
    },
    {
      county: 37017,
      diabetes: 8,
      obesity: 29.7,
    },
    {
      county: 37019,
      diabetes: 8.4,
      obesity: 27.4,
    },
    {
      county: 37021,
      diabetes: 6.8,
      obesity: 25.5,
    },
    {
      county: 37023,
      diabetes: 8.3,
      obesity: 29.8,
    },
    {
      county: 37025,
      diabetes: 9.5,
      obesity: 28.6,
    },
    {
      county: 37027,
      diabetes: 11.1,
      obesity: 30.4,
    },
    {
      county: 37029,
      diabetes: 7.1,
      obesity: 17.4,
    },
    {
      county: 37031,
      diabetes: 8.1,
      obesity: 29.4,
    },
    {
      county: 37033,
      diabetes: 7.3,
      obesity: 18.6,
    },
    {
      county: 37035,
      diabetes: 8.9,
      obesity: 27.4,
    },
    {
      county: 37037,
      diabetes: 7.1,
      obesity: 26.2,
    },
    {
      county: 37039,
      diabetes: 9.5,
      obesity: 26.5,
    },
    {
      county: 37041,
      diabetes: 8.3,
      obesity: 20.9,
    },
    {
      county: 37043,
      diabetes: 7.4,
      obesity: 17.5,
    },
    {
      county: 37045,
      diabetes: 11.4,
      obesity: 30.8,
    },
    {
      county: 37047,
      diabetes: 10.6,
      obesity: 30.3,
    },
    {
      county: 37049,
      diabetes: 9.9,
      obesity: 26.9,
    },
    {
      county: 37051,
      diabetes: 11.9,
      obesity: 34.2,
    },
    {
      county: 37053,
      diabetes: 7.3,
      obesity: 23.1,
    },
    {
      county: 37055,
      diabetes: 6.4,
      obesity: 21.8,
    },
    {
      county: 37057,
      diabetes: 7.9,
      obesity: 35.3,
    },
    {
      county: 37059,
      diabetes: 7.2,
      obesity: 22.9,
    },
    {
      county: 37061,
      diabetes: 10.3,
      obesity: 30.9,
    },
    {
      county: 37063,
      diabetes: 9.1,
      obesity: 33.4,
    },
    {
      county: 37065,
      diabetes: 9.7,
      obesity: 22.2,
    },
    {
      county: 37067,
      diabetes: 8.9,
      obesity: 31.4,
    },
    {
      county: 37069,
      diabetes: 10.4,
      obesity: 27.2,
    },
    {
      county: 37071,
      diabetes: 8.7,
      obesity: 26.2,
    },
    {
      county: 37073,
      diabetes: 8.2,
      obesity: 17.8,
    },
    {
      county: 37075,
      diabetes: 6.9,
      obesity: 18.9,
    },
    {
      county: 37077,
      diabetes: 7.4,
      obesity: 18.3,
    },
    {
      county: 37079,
      diabetes: 8.3,
      obesity: 19.1,
    },
    {
      county: 37081,
      diabetes: 8.9,
      obesity: 35.7,
    },
    {
      county: 37083,
      diabetes: 10.9,
      obesity: 30.7,
    },
    {
      county: 37085,
      diabetes: 11,
      obesity: 41.3,
    },
    {
      county: 37087,
      diabetes: 10.5,
      obesity: 31.6,
    },
    {
      county: 37089,
      diabetes: 6.5,
      obesity: 34.2,
    },
    {
      county: 37091,
      diabetes: 9.7,
      obesity: 23.7,
    },
    {
      county: 37093,
      diabetes: 10,
      obesity: 36.6,
    },
    {
      county: 37095,
      diabetes: 7.9,
      obesity: 18.4,
    },
    {
      county: 37097,
      diabetes: 11.1,
      obesity: 31.6,
    },
    {
      county: 37099,
      diabetes: 9.6,
      obesity: 26.7,
    },
    {
      county: 37101,
      diabetes: 12,
      obesity: 29.6,
    },
    {
      county: 37103,
      diabetes: 7.2,
      obesity: 18.8,
    },
    {
      county: 37105,
      diabetes: 8.6,
      obesity: 27,
    },
    {
      county: 37107,
      diabetes: 7.4,
      obesity: 31.3,
    },
    {
      county: 37109,
      diabetes: 7.9,
      obesity: 24.3,
    },
    {
      county: 37111,
      diabetes: 9.7,
      obesity: 25.8,
    },
    {
      county: 37113,
      diabetes: 8.6,
      obesity: 24.1,
    },
    {
      county: 37115,
      diabetes: 7.7,
      obesity: 24.5,
    },
    {
      county: 37117,
      diabetes: 9,
      obesity: 20.7,
    },
    {
      county: 37119,
      diabetes: 8.3,
      obesity: 27,
    },
    {
      county: 37121,
      diabetes: 6.8,
      obesity: 20.2,
    },
    {
      county: 37123,
      diabetes: 8.1,
      obesity: 18.7,
    },
    {
      county: 37125,
      diabetes: 7,
      obesity: 25.2,
    },
    {
      county: 37127,
      diabetes: 10.5,
      obesity: 27.8,
    },
    {
      county: 37129,
      diabetes: 7.5,
      obesity: 23.9,
    },
    {
      county: 37131,
      diabetes: 8.2,
      obesity: 18.1,
    },
    {
      county: 37133,
      diabetes: 9.2,
      obesity: 31.2,
    },
    {
      county: 37135,
      diabetes: 6.8,
      obesity: 22.9,
    },
    {
      county: 37137,
      diabetes: 7.4,
      obesity: 19.7,
    },
    {
      county: 37139,
      diabetes: 8.5,
      obesity: 26.6,
    },
    {
      county: 37141,
      diabetes: 8,
      obesity: 21,
    },
    {
      county: 37143,
      diabetes: 8,
      obesity: 18.4,
    },
    {
      county: 37145,
      diabetes: 7.2,
      obesity: 25.7,
    },
    {
      county: 37147,
      diabetes: 9.8,
      obesity: 35.5,
    },
    {
      county: 37149,
      diabetes: 7.5,
      obesity: 23.7,
    },
    {
      county: 37151,
      diabetes: 9.7,
      obesity: 33,
    },
    {
      county: 37153,
      diabetes: 9.8,
      obesity: 25.4,
    },
    {
      county: 37155,
      diabetes: 13.4,
      obesity: 44,
    },
    {
      county: 37157,
      diabetes: 11.1,
      obesity: 28.9,
    },
    {
      county: 37159,
      diabetes: 9.9,
      obesity: 31.3,
    },
    {
      county: 37161,
      diabetes: 8.7,
      obesity: 24.8,
    },
    {
      county: 37163,
      diabetes: 10.9,
      obesity: 31.3,
    },
    {
      county: 37165,
      diabetes: 12.8,
      obesity: 23.6,
    },
    {
      county: 37167,
      diabetes: 9.5,
      obesity: 26.8,
    },
    {
      county: 37169,
      diabetes: 9.5,
      obesity: 33.9,
    },
    {
      county: 37171,
      diabetes: 9.5,
      obesity: 25.3,
    },
    {
      county: 37173,
      diabetes: 9.3,
      obesity: 18.7,
    },
    {
      county: 37175,
      diabetes: 7.2,
      obesity: 17.4,
    },
    {
      county: 37177,
      diabetes: 7.7,
      obesity: 17.3,
    },
    {
      county: 37179,
      diabetes: 8.4,
      obesity: 28.3,
    },
    {
      county: 37181,
      diabetes: 8.7,
      obesity: 28.4,
    },
    {
      county: 37183,
      diabetes: 8.1,
      obesity: 27.3,
    },
    {
      county: 37185,
      diabetes: 8.1,
      obesity: 17.2,
    },
    {
      county: 37187,
      diabetes: 9.2,
      obesity: 18.6,
    },
    {
      county: 37189,
      diabetes: 7,
      obesity: 23.2,
    },
    {
      county: 37191,
      diabetes: 12.8,
      obesity: 34.8,
    },
    {
      county: 37193,
      diabetes: 8.2,
      obesity: 30.6,
    },
    {
      county: 37195,
      diabetes: 8.9,
      obesity: 32.1,
    },
    {
      county: 37197,
      diabetes: 9.7,
      obesity: 25.2,
    },
    {
      county: 37199,
      diabetes: 6.8,
      obesity: 21.5,
    },
    {
      county: 38001,
      diabetes: 6.9,
      obesity: 23.1,
    },
    {
      county: 38003,
      diabetes: 8.8,
      obesity: 32.4,
    },
    {
      county: 38005,
      diabetes: 9.5,
      obesity: 27.9,
    },
    {
      county: 38007,
      diabetes: 7.2,
      obesity: 23,
    },
    {
      county: 38009,
      diabetes: 8,
      obesity: 27.3,
    },
    {
      county: 38011,
      diabetes: 5.7,
      obesity: 25.3,
    },
    {
      county: 38013,
      diabetes: 7.5,
      obesity: 26.5,
    },
    {
      county: 38015,
      diabetes: 6.9,
      obesity: 31.1,
    },
    {
      county: 38017,
      diabetes: 8.8,
      obesity: 32.5,
    },
    {
      county: 38019,
      diabetes: 7.2,
      obesity: 24.1,
    },
    {
      county: 38021,
      diabetes: 7,
      obesity: 29,
    },
    {
      county: 38023,
      diabetes: 7.7,
      obesity: 24.3,
    },
    {
      county: 38025,
      diabetes: 7.5,
      obesity: 30.2,
    },
    {
      county: 38027,
      diabetes: 7.9,
      obesity: 27,
    },
    {
      county: 38029,
      diabetes: 8.4,
      obesity: 25.2,
    },
    {
      county: 38031,
      diabetes: 8.1,
      obesity: 30.7,
    },
    {
      county: 38033,
      diabetes: 7.7,
      obesity: 24.8,
    },
    {
      county: 38035,
      diabetes: 8.9,
      obesity: 31.8,
    },
    {
      county: 38037,
      diabetes: 8.5,
      obesity: 25.6,
    },
    {
      county: 38039,
      diabetes: 7,
      obesity: 29.8,
    },
    {
      county: 38041,
      diabetes: 7.1,
      obesity: 23.4,
    },
    {
      county: 38043,
      diabetes: 6.2,
      obesity: 29.7,
    },
    {
      county: 38045,
      diabetes: 7.3,
      obesity: 29.5,
    },
    {
      county: 38047,
      diabetes: 7.5,
      obesity: 22.2,
    },
    {
      county: 38049,
      diabetes: 7.9,
      obesity: 30.3,
    },
    {
      county: 38051,
      diabetes: 9.4,
      obesity: 27.9,
    },
    {
      county: 38053,
      diabetes: 6.9,
      obesity: 32,
    },
    {
      county: 38055,
      diabetes: 8.3,
      obesity: 31.7,
    },
    {
      county: 38057,
      diabetes: 8.2,
      obesity: 31.3,
    },
    {
      county: 38059,
      diabetes: 10.4,
      obesity: 32.3,
    },
    {
      county: 38061,
      diabetes: 9,
      obesity: 35.3,
    },
    {
      county: 38063,
      diabetes: 10,
      obesity: 27.7,
    },
    {
      county: 38065,
      diabetes: 6.5,
      obesity: 28,
    },
    {
      county: 38067,
      diabetes: 7.5,
      obesity: 33.6,
    },
    {
      county: 38069,
      diabetes: 6.8,
      obesity: 30.7,
    },
    {
      county: 38071,
      diabetes: 8.7,
      obesity: 31.9,
    },
    {
      county: 38073,
      diabetes: 8.4,
      obesity: 30.1,
    },
    {
      county: 38075,
      diabetes: 6.4,
      obesity: 31.1,
    },
    {
      county: 38077,
      diabetes: 8.3,
      obesity: 31.7,
    },
    {
      county: 38079,
      diabetes: 16.4,
      obesity: 48.4,
    },
    {
      county: 38081,
      diabetes: 8.3,
      obesity: 26.7,
    },
    {
      county: 38083,
      diabetes: 8.9,
      obesity: 24.4,
    },
    {
      county: 38085,
      diabetes: 10.3,
      obesity: 21.6,
    },
    {
      county: 38087,
      diabetes: 7.5,
      obesity: 20.6,
    },
    {
      county: 38089,
      diabetes: 7.5,
      obesity: 27.8,
    },
    {
      county: 38091,
      diabetes: 8.2,
      obesity: 23.3,
    },
    {
      county: 38093,
      diabetes: 6.5,
      obesity: 31.5,
    },
    {
      county: 38095,
      diabetes: 6.9,
      obesity: 26.9,
    },
    {
      county: 38097,
      diabetes: 7.7,
      obesity: 29.6,
    },
    {
      county: 38099,
      diabetes: 7.2,
      obesity: 29.2,
    },
    {
      county: 38101,
      diabetes: 8.8,
      obesity: 36.7,
    },
    {
      county: 38103,
      diabetes: 8.1,
      obesity: 27.3,
    },
    {
      county: 38105,
      diabetes: 7.5,
      obesity: 35.5,
    },
    {
      county: 39001,
      diabetes: 10.7,
      obesity: 36.2,
    },
    {
      county: 39003,
      diabetes: 11.6,
      obesity: 37,
    },
    {
      county: 39005,
      diabetes: 8.4,
      obesity: 27,
    },
    {
      county: 39007,
      diabetes: 9.1,
      obesity: 39.7,
    },
    {
      county: 39009,
      diabetes: 10.9,
      obesity: 32.8,
    },
    {
      county: 39011,
      diabetes: 9.4,
      obesity: 36.6,
    },
    {
      county: 39013,
      diabetes: 10,
      obesity: 36.3,
    },
    {
      county: 39015,
      diabetes: 9.7,
      obesity: 30.2,
    },
    {
      county: 39017,
      diabetes: 9.5,
      obesity: 32.9,
    },
    {
      county: 39019,
      diabetes: 9.7,
      obesity: 29.7,
    },
    {
      county: 39021,
      diabetes: 8.3,
      obesity: 34.6,
    },
    {
      county: 39023,
      diabetes: 12.1,
      obesity: 35.5,
    },
    {
      county: 39025,
      diabetes: 10,
      obesity: 33.8,
    },
    {
      county: 39027,
      diabetes: 9.1,
      obesity: 32.5,
    },
    {
      county: 39029,
      diabetes: 11.5,
      obesity: 34.7,
    },
    {
      county: 39031,
      diabetes: 9.9,
      obesity: 33,
    },
    {
      county: 39033,
      diabetes: 9.8,
      obesity: 33.4,
    },
    {
      county: 39035,
      diabetes: 9.4,
      obesity: 32.8,
    },
    {
      county: 39037,
      diabetes: 9,
      obesity: 32.8,
    },
    {
      county: 39039,
      diabetes: 10.6,
      obesity: 31.5,
    },
    {
      county: 39041,
      diabetes: 9,
      obesity: 30.1,
    },
    {
      county: 39043,
      diabetes: 9.2,
      obesity: 35.8,
    },
    {
      county: 39045,
      diabetes: 8.6,
      obesity: 36.9,
    },
    {
      county: 39047,
      diabetes: 12.1,
      obesity: 41.5,
    },
    {
      county: 39049,
      diabetes: 10.5,
      obesity: 33.8,
    },
    {
      county: 39051,
      diabetes: 8.6,
      obesity: 30.3,
    },
    {
      county: 39053,
      diabetes: 12.1,
      obesity: 39.9,
    },
    {
      county: 39055,
      diabetes: 7.2,
      obesity: 29.8,
    },
    {
      county: 39057,
      diabetes: 8.3,
      obesity: 31.7,
    },
    {
      county: 39059,
      diabetes: 10.2,
      obesity: 35.4,
    },
    {
      county: 39061,
      diabetes: 10.3,
      obesity: 32.6,
    },
    {
      county: 39063,
      diabetes: 9.3,
      obesity: 30.5,
    },
    {
      county: 39065,
      diabetes: 9.9,
      obesity: 33.7,
    },
    {
      county: 39067,
      diabetes: 8.5,
      obesity: 36.7,
    },
    {
      county: 39069,
      diabetes: 8.6,
      obesity: 30.2,
    },
    {
      county: 39071,
      diabetes: 9.9,
      obesity: 38.2,
    },
    {
      county: 39073,
      diabetes: 7.7,
      obesity: 32.7,
    },
    {
      county: 39075,
      diabetes: 7.2,
      obesity: 24.7,
    },
    {
      county: 39077,
      diabetes: 8.5,
      obesity: 39.5,
    },
    {
      county: 39079,
      diabetes: 13,
      obesity: 39.9,
    },
    {
      county: 39081,
      diabetes: 11.2,
      obesity: 36.2,
    },
    {
      county: 39083,
      diabetes: 9.1,
      obesity: 38.7,
    },
    {
      county: 39085,
      diabetes: 9.4,
      obesity: 32,
    },
    {
      county: 39087,
      diabetes: 11,
      obesity: 38.4,
    },
    {
      county: 39089,
      diabetes: 12.2,
      obesity: 32,
    },
    {
      county: 39091,
      diabetes: 7.8,
      obesity: 26.9,
    },
    {
      county: 39093,
      diabetes: 10.7,
      obesity: 34.6,
    },
    {
      county: 39095,
      diabetes: 11.2,
      obesity: 36.6,
    },
    {
      county: 39097,
      diabetes: 9.5,
      obesity: 29.4,
    },
    {
      county: 39099,
      diabetes: 11.6,
      obesity: 34.1,
    },
    {
      county: 39101,
      diabetes: 11.8,
      obesity: 38.5,
    },
    {
      county: 39103,
      diabetes: 8.4,
      obesity: 30.8,
    },
    {
      county: 39105,
      diabetes: 11.4,
      obesity: 34.8,
    },
    {
      county: 39107,
      diabetes: 7.7,
      obesity: 29.4,
    },
    {
      county: 39109,
      diabetes: 8.2,
      obesity: 30.1,
    },
    {
      county: 39111,
      diabetes: 8.2,
      obesity: 30.1,
    },
    {
      county: 39113,
      diabetes: 11.2,
      obesity: 36.5,
    },
    {
      county: 39115,
      diabetes: 7.3,
      obesity: 32.1,
    },
    {
      county: 39117,
      diabetes: 8.3,
      obesity: 36.1,
    },
    {
      county: 39119,
      diabetes: 10.1,
      obesity: 37.7,
    },
    {
      county: 39121,
      diabetes: 8.2,
      obesity: 30.9,
    },
    {
      county: 39123,
      diabetes: 7.1,
      obesity: 26.5,
    },
    {
      county: 39125,
      diabetes: 8.7,
      obesity: 26.5,
    },
    {
      county: 39127,
      diabetes: 8,
      obesity: 30.4,
    },
    {
      county: 39129,
      diabetes: 8.9,
      obesity: 34.9,
    },
    {
      county: 39131,
      diabetes: 13.7,
      obesity: 36.7,
    },
    {
      county: 39133,
      diabetes: 7.9,
      obesity: 31.1,
    },
    {
      county: 39135,
      diabetes: 10.4,
      obesity: 28.8,
    },
    {
      county: 39137,
      diabetes: 7.9,
      obesity: 30.3,
    },
    {
      county: 39139,
      diabetes: 10.8,
      obesity: 36.3,
    },
    {
      county: 39141,
      diabetes: 11.1,
      obesity: 37.8,
    },
    {
      county: 39143,
      diabetes: 9.4,
      obesity: 30.7,
    },
    {
      county: 39145,
      diabetes: 12.9,
      obesity: 41.9,
    },
    {
      county: 39147,
      diabetes: 10.4,
      obesity: 34.7,
    },
    {
      county: 39149,
      diabetes: 7.2,
      obesity: 28,
    },
    {
      county: 39151,
      diabetes: 9.9,
      obesity: 35.7,
    },
    {
      county: 39153,
      diabetes: 9.5,
      obesity: 32.4,
    },
    {
      county: 39155,
      diabetes: 10.7,
      obesity: 38.3,
    },
    {
      county: 39157,
      diabetes: 8.4,
      obesity: 33.9,
    },
    {
      county: 39159,
      diabetes: 8.2,
      obesity: 34.3,
    },
    {
      county: 39161,
      diabetes: 10.8,
      obesity: 37.3,
    },
    {
      county: 39163,
      diabetes: 12.8,
      obesity: 35.5,
    },
    {
      county: 39165,
      diabetes: 7.7,
      obesity: 31.6,
    },
    {
      county: 39167,
      diabetes: 9,
      obesity: 30.7,
    },
    {
      county: 39169,
      diabetes: 8.3,
      obesity: 38.7,
    },
    {
      county: 39171,
      diabetes: 10.6,
      obesity: 34.3,
    },
    {
      county: 39173,
      diabetes: 10.8,
      obesity: 38,
    },
    {
      county: 39175,
      diabetes: 10.2,
      obesity: 33.3,
    },
    {
      county: 40001,
      diabetes: 10.5,
      obesity: 28.6,
    },
    {
      county: 40003,
      diabetes: 7.4,
      obesity: 19.5,
    },
    {
      county: 40005,
      diabetes: 6.9,
      obesity: 29.6,
    },
    {
      county: 40007,
      diabetes: 7,
      obesity: 25.2,
    },
    {
      county: 40009,
      diabetes: 8.3,
      obesity: 30.3,
    },
    {
      county: 40011,
      diabetes: 9.9,
      obesity: 33.3,
    },
    {
      county: 40013,
      diabetes: 8,
      obesity: 31.1,
    },
    {
      county: 40015,
      diabetes: 10.9,
      obesity: 31,
    },
    {
      county: 40017,
      diabetes: 10.5,
      obesity: 31.1,
    },
    {
      county: 40019,
      diabetes: 10.2,
      obesity: 34.3,
    },
    {
      county: 40021,
      diabetes: 11.3,
      obesity: 31,
    },
    {
      county: 40023,
      diabetes: 9.8,
      obesity: 24.6,
    },
    {
      county: 40025,
      diabetes: 6.8,
      obesity: 17.8,
    },
    {
      county: 40027,
      diabetes: 9.6,
      obesity: 31.6,
    },
    {
      county: 40029,
      diabetes: 8.9,
      obesity: 25.2,
    },
    {
      county: 40031,
      diabetes: 12.1,
      obesity: 38.5,
    },
    {
      county: 40033,
      diabetes: 7.5,
      obesity: 23.8,
    },
    {
      county: 40035,
      diabetes: 8.7,
      obesity: 22,
    },
    {
      county: 40037,
      diabetes: 8.3,
      obesity: 30.5,
    },
    {
      county: 40039,
      diabetes: 8.7,
      obesity: 33.9,
    },
    {
      county: 40041,
      diabetes: 9.2,
      obesity: 31,
    },
    {
      county: 40043,
      diabetes: 8,
      obesity: 26.4,
    },
    {
      county: 40045,
      diabetes: 7.2,
      obesity: 23.3,
    },
    {
      county: 40047,
      diabetes: 9,
      obesity: 35.4,
    },
    {
      county: 40049,
      diabetes: 8.6,
      obesity: 32.8,
    },
    {
      county: 40051,
      diabetes: 9.1,
      obesity: 35.3,
    },
    {
      county: 40053,
      diabetes: 8.5,
      obesity: 23.4,
    },
    {
      county: 40055,
      diabetes: 7.4,
      obesity: 24.1,
    },
    {
      county: 40057,
      diabetes: 6.8,
      obesity: 19.7,
    },
    {
      county: 40059,
      diabetes: 7.2,
      obesity: 20.3,
    },
    {
      county: 40061,
      diabetes: 7.6,
      obesity: 24.8,
    },
    {
      county: 40063,
      diabetes: 9,
      obesity: 20.6,
    },
    {
      county: 40065,
      diabetes: 9.6,
      obesity: 25.2,
    },
    {
      county: 40067,
      diabetes: 8.2,
      obesity: 20.1,
    },
    {
      county: 40069,
      diabetes: 7.9,
      obesity: 19.9,
    },
    {
      county: 40071,
      diabetes: 9.1,
      obesity: 35.6,
    },
    {
      county: 40073,
      diabetes: 9.2,
      obesity: 28.8,
    },
    {
      county: 40075,
      diabetes: 7.9,
      obesity: 22.9,
    },
    {
      county: 40077,
      diabetes: 9.4,
      obesity: 27.1,
    },
    {
      county: 40079,
      diabetes: 11.1,
      obesity: 40.3,
    },
    {
      county: 40081,
      diabetes: 9.1,
      obesity: 43.5,
    },
    {
      county: 40083,
      diabetes: 9.6,
      obesity: 32.3,
    },
    {
      county: 40085,
      diabetes: 7.4,
      obesity: 20.5,
    },
    {
      county: 40087,
      diabetes: 7.4,
      obesity: 30.5,
    },
    {
      county: 40089,
      diabetes: 10,
      obesity: 31,
    },
    {
      county: 40091,
      diabetes: 9.8,
      obesity: 25.2,
    },
    {
      county: 40093,
      diabetes: 7.8,
      obesity: 22.6,
    },
    {
      county: 40095,
      diabetes: 8.7,
      obesity: 24.7,
    },
    {
      county: 40097,
      diabetes: 13.4,
      obesity: 31,
    },
    {
      county: 40099,
      diabetes: 8.8,
      obesity: 26.8,
    },
    {
      county: 40101,
      diabetes: 11.8,
      obesity: 40.4,
    },
    {
      county: 40103,
      diabetes: 8.7,
      obesity: 21.7,
    },
    {
      county: 40105,
      diabetes: 7.9,
      obesity: 24.5,
    },
    {
      county: 40107,
      diabetes: 9.1,
      obesity: 20.9,
    },
    {
      county: 40109,
      diabetes: 10.7,
      obesity: 33.6,
    },
    {
      county: 40111,
      diabetes: 10,
      obesity: 35.1,
    },
    {
      county: 40113,
      diabetes: 10,
      obesity: 30,
    },
    {
      county: 40115,
      diabetes: 9.7,
      obesity: 31.5,
    },
    {
      county: 40117,
      diabetes: 7,
      obesity: 26.5,
    },
    {
      county: 40119,
      diabetes: 8.8,
      obesity: 31.9,
    },
    {
      county: 40121,
      diabetes: 8.4,
      obesity: 26,
    },
    {
      county: 40123,
      diabetes: 10.8,
      obesity: 36.8,
    },
    {
      county: 40125,
      diabetes: 10.9,
      obesity: 35.1,
    },
    {
      county: 40127,
      diabetes: 8.2,
      obesity: 20.2,
    },
    {
      county: 40129,
      diabetes: 7,
      obesity: 16.6,
    },
    {
      county: 40131,
      diabetes: 9.5,
      obesity: 35.9,
    },
    {
      county: 40133,
      diabetes: 10.2,
      obesity: 27.4,
    },
    {
      county: 40135,
      diabetes: 11.2,
      obesity: 28.4,
    },
    {
      county: 40137,
      diabetes: 9.3,
      obesity: 37.7,
    },
    {
      county: 40139,
      diabetes: 9.4,
      obesity: 31.5,
    },
    {
      county: 40141,
      diabetes: 8.2,
      obesity: 24.5,
    },
    {
      county: 40143,
      diabetes: 9.8,
      obesity: 34.4,
    },
    {
      county: 40145,
      diabetes: 12.6,
      obesity: 34,
    },
    {
      county: 40147,
      diabetes: 8,
      obesity: 30,
    },
    {
      county: 40149,
      diabetes: 10.7,
      obesity: 28.7,
    },
    {
      county: 40151,
      diabetes: 8.3,
      obesity: 27.3,
    },
    {
      county: 40153,
      diabetes: 9.1,
      obesity: 35.6,
    },
    {
      county: 41001,
      diabetes: 7.5,
      obesity: 20.2,
    },
    {
      county: 41003,
      diabetes: 6.6,
      obesity: 24.3,
    },
    {
      county: 41005,
      diabetes: 7.6,
      obesity: 26.4,
    },
    {
      county: 41007,
      diabetes: 7.1,
      obesity: 25.8,
    },
    {
      county: 41009,
      diabetes: 8.9,
      obesity: 34.1,
    },
    {
      county: 41011,
      diabetes: 8.7,
      obesity: 34.2,
    },
    {
      county: 41013,
      diabetes: 8,
      obesity: 25.8,
    },
    {
      county: 41015,
      diabetes: 7.9,
      obesity: 20.7,
    },
    {
      county: 41017,
      diabetes: 8.1,
      obesity: 24.9,
    },
    {
      county: 41019,
      diabetes: 7.6,
      obesity: 31.7,
    },
    {
      county: 41021,
      diabetes: 6.8,
      obesity: 17.2,
    },
    {
      county: 41023,
      diabetes: 7.6,
      obesity: 18.4,
    },
    {
      county: 41025,
      diabetes: 7.4,
      obesity: 19.1,
    },
    {
      county: 41027,
      diabetes: 6,
      obesity: 19.8,
    },
    {
      county: 41029,
      diabetes: 7.6,
      obesity: 25.5,
    },
    {
      county: 41031,
      diabetes: 7.7,
      obesity: 26.5,
    },
    {
      county: 41033,
      diabetes: 8.4,
      obesity: 28.1,
    },
    {
      county: 41035,
      diabetes: 7.3,
      obesity: 26.7,
    },
    {
      county: 41037,
      diabetes: 8,
      obesity: 22.3,
    },
    {
      county: 41039,
      diabetes: 7.7,
      obesity: 28.8,
    },
    {
      county: 41041,
      diabetes: 8.1,
      obesity: 31.7,
    },
    {
      county: 41043,
      diabetes: 9.4,
      obesity: 34.4,
    },
    {
      county: 41045,
      diabetes: 9,
      obesity: 27,
    },
    {
      county: 41047,
      diabetes: 9.4,
      obesity: 35.9,
    },
    {
      county: 41049,
      diabetes: 9.2,
      obesity: 26.3,
    },
    {
      county: 41051,
      diabetes: 7.8,
      obesity: 25.6,
    },
    {
      county: 41053,
      diabetes: 9.3,
      obesity: 34.9,
    },
    {
      county: 41055,
      diabetes: 7.3,
      obesity: 19.2,
    },
    {
      county: 41057,
      diabetes: 6.2,
      obesity: 28,
    },
    {
      county: 41059,
      diabetes: 9,
      obesity: 33,
    },
    {
      county: 41061,
      diabetes: 9.7,
      obesity: 29.9,
    },
    {
      county: 41063,
      diabetes: 7.3,
      obesity: 23.7,
    },
    {
      county: 41065,
      diabetes: 7.9,
      obesity: 24,
    },
    {
      county: 41067,
      diabetes: 7.9,
      obesity: 28.2,
    },
    {
      county: 41069,
      diabetes: 6.9,
      obesity: 17.7,
    },
    {
      county: 41071,
      diabetes: 7.1,
      obesity: 30.7,
    },
    {
      county: 42001,
      diabetes: 7.5,
      obesity: 30.4,
    },
    {
      county: 42003,
      diabetes: 8.1,
      obesity: 29.7,
    },
    {
      county: 42005,
      diabetes: 8.7,
      obesity: 38.2,
    },
    {
      county: 42007,
      diabetes: 7.8,
      obesity: 32.2,
    },
    {
      county: 42009,
      diabetes: 7.8,
      obesity: 25.5,
    },
    {
      county: 42011,
      diabetes: 7.2,
      obesity: 34.2,
    },
    {
      county: 42013,
      diabetes: 9.1,
      obesity: 27.9,
    },
    {
      county: 42015,
      diabetes: 8.4,
      obesity: 34,
    },
    {
      county: 42017,
      diabetes: 7.2,
      obesity: 25,
    },
    {
      county: 42019,
      diabetes: 7.9,
      obesity: 30.4,
    },
    {
      county: 42021,
      diabetes: 8,
      obesity: 25.6,
    },
    {
      county: 42023,
      diabetes: 7.3,
      obesity: 21,
    },
    {
      county: 42025,
      diabetes: 7.9,
      obesity: 19.4,
    },
    {
      county: 42027,
      diabetes: 7.5,
      obesity: 25.3,
    },
    {
      county: 42029,
      diabetes: 7.1,
      obesity: 26.5,
    },
    {
      county: 42031,
      diabetes: 8.1,
      obesity: 30.8,
    },
    {
      county: 42033,
      diabetes: 8,
      obesity: 30,
    },
    {
      county: 42035,
      diabetes: 8,
      obesity: 27.9,
    },
    {
      county: 42037,
      diabetes: 7.4,
      obesity: 29.4,
    },
    {
      county: 42039,
      diabetes: 7.1,
      obesity: 23.1,
    },
    {
      county: 42041,
      diabetes: 8.4,
      obesity: 31.6,
    },
    {
      county: 42043,
      diabetes: 7.4,
      obesity: 29.6,
    },
    {
      county: 42045,
      diabetes: 9.2,
      obesity: 26.7,
    },
    {
      county: 42047,
      diabetes: 8,
      obesity: 23.6,
    },
    {
      county: 42049,
      diabetes: 8.3,
      obesity: 33.1,
    },
    {
      county: 42051,
      diabetes: 9,
      obesity: 30.1,
    },
    {
      county: 42053,
      diabetes: 7.4,
      obesity: 18.6,
    },
    {
      county: 42055,
      diabetes: 7.7,
      obesity: 38.8,
    },
    {
      county: 42057,
      diabetes: 7.2,
      obesity: 27.7,
    },
    {
      county: 42059,
      diabetes: 9.1,
      obesity: 33.2,
    },
    {
      county: 42061,
      diabetes: 7.1,
      obesity: 22.8,
    },
    {
      county: 42063,
      diabetes: 7.6,
      obesity: 22.6,
    },
    {
      county: 42065,
      diabetes: 10.3,
      obesity: 33.6,
    },
    {
      county: 42067,
      diabetes: 7.3,
      obesity: 20.6,
    },
    {
      county: 42069,
      diabetes: 8.1,
      obesity: 27.2,
    },
    {
      county: 42071,
      diabetes: 8.8,
      obesity: 29.8,
    },
    {
      county: 42073,
      diabetes: 9,
      obesity: 31.4,
    },
    {
      county: 42075,
      diabetes: 9.8,
      obesity: 31.3,
    },
    {
      county: 42077,
      diabetes: 9.5,
      obesity: 34.6,
    },
    {
      county: 42079,
      diabetes: 10.2,
      obesity: 32.7,
    },
    {
      county: 42081,
      diabetes: 7.6,
      obesity: 29.9,
    },
    {
      county: 42083,
      diabetes: 7.8,
      obesity: 29,
    },
    {
      county: 42085,
      diabetes: 6.2,
      obesity: 27.6,
    },
    {
      county: 42087,
      diabetes: 8.1,
      obesity: 25.7,
    },
    {
      county: 42089,
      diabetes: 8.7,
      obesity: 29.6,
    },
    {
      county: 42091,
      diabetes: 7.7,
      obesity: 26.6,
    },
    {
      county: 42093,
      diabetes: 8.2,
      obesity: 19.7,
    },
    {
      county: 42095,
      diabetes: 8.9,
      obesity: 26.5,
    },
    {
      county: 42097,
      diabetes: 7.5,
      obesity: 33.8,
    },
    {
      county: 42099,
      diabetes: 8.7,
      obesity: 24.8,
    },
    {
      county: 42101,
      diabetes: 11.3,
      obesity: 29.1,
    },
    {
      county: 42103,
      diabetes: 7.6,
      obesity: 27.7,
    },
    {
      county: 42105,
      diabetes: 8.3,
      obesity: 19.4,
    },
    {
      county: 42107,
      diabetes: 7.8,
      obesity: 31,
    },
    {
      county: 42109,
      diabetes: 8,
      obesity: 33.1,
    },
    {
      county: 42111,
      diabetes: 8.1,
      obesity: 34,
    },
    {
      county: 42113,
      diabetes: 6.9,
      obesity: 17.8,
    },
    {
      county: 42115,
      diabetes: 8.3,
      obesity: 30.8,
    },
    {
      county: 42117,
      diabetes: 7.1,
      obesity: 27.4,
    },
    {
      county: 42119,
      diabetes: 8.9,
      obesity: 30,
    },
    {
      county: 42121,
      diabetes: 9.4,
      obesity: 31.2,
    },
    {
      county: 42123,
      diabetes: 8.1,
      obesity: 28,
    },
    {
      county: 42125,
      diabetes: 8.1,
      obesity: 32.6,
    },
    {
      county: 42127,
      diabetes: 8.3,
      obesity: 20.6,
    },
    {
      county: 42129,
      diabetes: 8.7,
      obesity: 34.5,
    },
    {
      county: 42131,
      diabetes: 9.1,
      obesity: 30.3,
    },
    {
      county: 42133,
      diabetes: 7.6,
      obesity: 31.2,
    },
    {
      county: 44001,
      diabetes: 7.5,
      obesity: 23.2,
    },
    {
      county: 44003,
      diabetes: 8.2,
      obesity: 30.5,
    },
    {
      county: 44005,
      diabetes: 6.6,
      obesity: 24.5,
    },
    {
      county: 44007,
      diabetes: 9.7,
      obesity: 31.4,
    },
    {
      county: 44009,
      diabetes: 7.2,
      obesity: 24.1,
    },
    {
      county: 45001,
      diabetes: 10.3,
      obesity: 33,
    },
    {
      county: 45003,
      diabetes: 11.4,
      obesity: 36.3,
    },
    {
      county: 45005,
      diabetes: 12,
      obesity: 22.5,
    },
    {
      county: 45007,
      diabetes: 11.5,
      obesity: 37.6,
    },
    {
      county: 45009,
      diabetes: 9.5,
      obesity: 28.9,
    },
    {
      county: 45011,
      diabetes: 11,
      obesity: 31,
    },
    {
      county: 45013,
      diabetes: 6.9,
      obesity: 24.4,
    },
    {
      county: 45015,
      diabetes: 12.3,
      obesity: 36.3,
    },
    {
      county: 45017,
      diabetes: 8.3,
      obesity: 27.4,
    },
    {
      county: 45019,
      diabetes: 9.1,
      obesity: 28.4,
    },
    {
      county: 45021,
      diabetes: 8.1,
      obesity: 27.9,
    },
    {
      county: 45023,
      diabetes: 13,
      obesity: 34.9,
    },
    {
      county: 45025,
      diabetes: 12.4,
      obesity: 35.5,
    },
    {
      county: 45027,
      diabetes: 10.8,
      obesity: 31.1,
    },
    {
      county: 45029,
      diabetes: 12.7,
      obesity: 29.7,
    },
    {
      county: 45031,
      diabetes: 12.2,
      obesity: 34.5,
    },
    {
      county: 45033,
      diabetes: 9.9,
      obesity: 31.3,
    },
    {
      county: 45035,
      diabetes: 10.1,
      obesity: 36.5,
    },
    {
      county: 45037,
      diabetes: 8.2,
      obesity: 32.1,
    },
    {
      county: 45039,
      diabetes: 10.8,
      obesity: 24.6,
    },
    {
      county: 45041,
      diabetes: 12.8,
      obesity: 37.9,
    },
    {
      county: 45043,
      diabetes: 11.9,
      obesity: 34,
    },
    {
      county: 45045,
      diabetes: 9.8,
      obesity: 31.2,
    },
    {
      county: 45047,
      diabetes: 11.7,
      obesity: 37.5,
    },
    {
      county: 45049,
      diabetes: 10.4,
      obesity: 31.1,
    },
    {
      county: 45051,
      diabetes: 9.9,
      obesity: 33.3,
    },
    {
      county: 45053,
      diabetes: 9.4,
      obesity: 27.2,
    },
    {
      county: 45055,
      diabetes: 11.5,
      obesity: 36.1,
    },
    {
      county: 45057,
      diabetes: 10.1,
      obesity: 32.5,
    },
    {
      county: 45059,
      diabetes: 12.5,
      obesity: 30.2,
    },
    {
      county: 45061,
      diabetes: 9.1,
      obesity: 25.1,
    },
    {
      county: 45063,
      diabetes: 10.2,
      obesity: 32.7,
    },
    {
      county: 45065,
      diabetes: 10.8,
      obesity: 30.4,
    },
    {
      county: 45067,
      diabetes: 10.2,
      obesity: 31,
    },
    {
      county: 45069,
      diabetes: 12.1,
      obesity: 29.9,
    },
    {
      county: 45071,
      diabetes: 10,
      obesity: 29.3,
    },
    {
      county: 45073,
      diabetes: 8.4,
      obesity: 31.7,
    },
    {
      county: 45075,
      diabetes: 14.4,
      obesity: 40.3,
    },
    {
      county: 45077,
      diabetes: 9.6,
      obesity: 22.1,
    },
    {
      county: 45079,
      diabetes: 9.3,
      obesity: 33.6,
    },
    {
      county: 45081,
      diabetes: 9.9,
      obesity: 30,
    },
    {
      county: 45083,
      diabetes: 11.3,
      obesity: 33.6,
    },
    {
      county: 45085,
      diabetes: 12.9,
      obesity: 37.2,
    },
    {
      county: 45087,
      diabetes: 10.6,
      obesity: 28.2,
    },
    {
      county: 45089,
      diabetes: 16.2,
      obesity: 41.7,
    },
    {
      county: 45091,
      diabetes: 10.3,
      obesity: 34.3,
    },
    {
      county: 46003,
      diabetes: 7.5,
      obesity: 24.5,
    },
    {
      county: 46005,
      diabetes: 7.8,
      obesity: 25.9,
    },
    {
      county: 46007,
      diabetes: 12.6,
      obesity: 39.2,
    },
    {
      county: 46009,
      diabetes: 8.2,
      obesity: 20.1,
    },
    {
      county: 46011,
      diabetes: 7.5,
      obesity: 30.9,
    },
    {
      county: 46013,
      diabetes: 8.2,
      obesity: 32.8,
    },
    {
      county: 46015,
      diabetes: 7.1,
      obesity: 25.4,
    },
    {
      county: 46017,
      diabetes: 11.5,
      obesity: 23.4,
    },
    {
      county: 46019,
      diabetes: 6.3,
      obesity: 23.6,
    },
    {
      county: 46021,
      diabetes: 6.5,
      obesity: 20.2,
    },
    {
      county: 46023,
      diabetes: 8,
      obesity: 23.1,
    },
    {
      county: 46025,
      diabetes: 6.9,
      obesity: 25.6,
    },
    {
      county: 46027,
      diabetes: 8.1,
      obesity: 22.5,
    },
    {
      county: 46029,
      diabetes: 8.3,
      obesity: 32.5,
    },
    {
      county: 46031,
      diabetes: 12.8,
      obesity: 37.6,
    },
    {
      county: 46033,
      diabetes: 7,
      obesity: 24.5,
    },
    {
      county: 46035,
      diabetes: 7.7,
      obesity: 26.9,
    },
    {
      county: 46037,
      diabetes: 6.5,
      obesity: 27.5,
    },
    {
      county: 46039,
      diabetes: 5.9,
      obesity: 30,
    },
    {
      county: 46041,
      diabetes: 14.6,
      obesity: 41.8,
    },
    {
      county: 46043,
      diabetes: 7.2,
      obesity: 20.1,
    },
    {
      county: 46045,
      diabetes: 6.6,
      obesity: 29.9,
    },
    {
      county: 46047,
      diabetes: 7.1,
      obesity: 27.5,
    },
    {
      county: 46049,
      diabetes: 6,
      obesity: 23.8,
    },
    {
      county: 46051,
      diabetes: 6.6,
      obesity: 25.3,
    },
    {
      county: 46053,
      diabetes: 7.6,
      obesity: 24.2,
    },
    {
      county: 46055,
      diabetes: 7.8,
      obesity: 26.8,
    },
    {
      county: 46057,
      diabetes: 8.1,
      obesity: 29.3,
    },
    {
      county: 46059,
      diabetes: 7.2,
      obesity: 20.6,
    },
    {
      county: 46061,
      diabetes: 7.2,
      obesity: 18.4,
    },
    {
      county: 46063,
      diabetes: 6.7,
      obesity: 20,
    },
    {
      county: 46065,
      diabetes: 6.6,
      obesity: 26.5,
    },
    {
      county: 46067,
      diabetes: 6.4,
      obesity: 21.1,
    },
    {
      county: 46069,
      diabetes: 7.3,
      obesity: 17.2,
    },
    {
      county: 46071,
      diabetes: 10.6,
      obesity: 30.3,
    },
    {
      county: 46073,
      diabetes: 7.3,
      obesity: 19.7,
    },
    {
      county: 46075,
      diabetes: 7.1,
      obesity: 18.6,
    },
    {
      county: 46077,
      diabetes: 7.8,
      obesity: 23.3,
    },
    {
      county: 46079,
      diabetes: 6.9,
      obesity: 25.4,
    },
    {
      county: 46081,
      diabetes: 5.7,
      obesity: 22.4,
    },
    {
      county: 46083,
      diabetes: 7.5,
      obesity: 30.4,
    },
    {
      county: 46085,
      diabetes: 8.4,
      obesity: 20.4,
    },
    {
      county: 46087,
      diabetes: 8.3,
      obesity: 21.8,
    },
    {
      county: 46089,
      diabetes: 6.4,
      obesity: 28.4,
    },
    {
      county: 46091,
      diabetes: 6,
      obesity: 21.8,
    },
    {
      county: 46093,
      diabetes: 7.4,
      obesity: 27.4,
    },
    {
      county: 46095,
      diabetes: 10.2,
      obesity: 31.6,
    },
    {
      county: 46097,
      diabetes: 7.6,
      obesity: 19.1,
    },
    {
      county: 46099,
      diabetes: 7.5,
      obesity: 30.5,
    },
    {
      county: 46101,
      diabetes: 6.9,
      obesity: 22.4,
    },
    {
      county: 46102,
      diabetes: 15,
      obesity: 39.8,
    },
    {
      county: 46103,
      diabetes: 8,
      obesity: 29.3,
    },
    {
      county: 46105,
      diabetes: 6.8,
      obesity: 26,
    },
    {
      county: 46107,
      diabetes: 7.7,
      obesity: 20.3,
    },
    {
      county: 46109,
      diabetes: 7.8,
      obesity: 24.4,
    },
    {
      county: 46111,
      diabetes: 7.8,
      obesity: 19.6,
    },
    {
      county: 46113,
      diabetes: "No Data",
      obesity: "No Data",
    },
    {
      county: 46115,
      diabetes: 7.7,
      obesity: 24.7,
    },
    {
      county: 46117,
      diabetes: 6.8,
      obesity: 22,
    },
    {
      county: 46119,
      diabetes: 6.8,
      obesity: 19.6,
    },
    {
      county: 46121,
      diabetes: 15.3,
      obesity: 41.9,
    },
    {
      county: 46123,
      diabetes: 7.2,
      obesity: 25.4,
    },
    {
      county: 46125,
      diabetes: 8.5,
      obesity: 25,
    },
    {
      county: 46127,
      diabetes: 7.9,
      obesity: 36.1,
    },
    {
      county: 46129,
      diabetes: 9.4,
      obesity: 17.4,
    },
    {
      county: 46135,
      diabetes: 7,
      obesity: 32.9,
    },
    {
      county: 46137,
      diabetes: 13.7,
      obesity: 42,
    },
    {
      county: 47001,
      diabetes: 7.4,
      obesity: 28,
    },
    {
      county: 47003,
      diabetes: 8.8,
      obesity: 27.3,
    },
    {
      county: 47005,
      diabetes: 8.2,
      obesity: 22.1,
    },
    {
      county: 47007,
      diabetes: 7.4,
      obesity: 22,
    },
    {
      county: 47009,
      diabetes: 9.2,
      obesity: 35,
    },
    {
      county: 47011,
      diabetes: 11.5,
      obesity: 37.6,
    },
    {
      county: 47013,
      diabetes: 9,
      obesity: 28.3,
    },
    {
      county: 47015,
      diabetes: 6.7,
      obesity: 21.3,
    },
    {
      county: 47017,
      diabetes: 9,
      obesity: 27.1,
    },
    {
      county: 47019,
      diabetes: 10.5,
      obesity: 27.2,
    },
    {
      county: 47021,
      diabetes: 8.6,
      obesity: 23.2,
    },
    {
      county: 47023,
      diabetes: 7.5,
      obesity: 29.9,
    },
    {
      county: 47025,
      diabetes: 9.1,
      obesity: 28,
    },
    {
      county: 47027,
      diabetes: 6.7,
      obesity: 19.6,
    },
    {
      county: 47029,
      diabetes: 10.7,
      obesity: 27.6,
    },
    {
      county: 47031,
      diabetes: 11.1,
      obesity: 31.3,
    },
    {
      county: 47033,
      diabetes: 7.8,
      obesity: 22.5,
    },
    {
      county: 47035,
      diabetes: 9.9,
      obesity: 31.4,
    },
    {
      county: 47037,
      diabetes: 9.3,
      obesity: 29,
    },
    {
      county: 47039,
      diabetes: 8.7,
      obesity: 28.9,
    },
    {
      county: 47041,
      diabetes: 9.2,
      obesity: 24.9,
    },
    {
      county: 47043,
      diabetes: 7.1,
      obesity: 24.3,
    },
    {
      county: 47045,
      diabetes: 8.5,
      obesity: 31.2,
    },
    {
      county: 47047,
      diabetes: 9.4,
      obesity: 27.1,
    },
    {
      county: 47049,
      diabetes: 10.8,
      obesity: 27.4,
    },
    {
      county: 47051,
      diabetes: 9,
      obesity: 34,
    },
    {
      county: 47053,
      diabetes: 12.1,
      obesity: 32.4,
    },
    {
      county: 47055,
      diabetes: 9.2,
      obesity: 29.1,
    },
    {
      county: 47057,
      diabetes: 7.6,
      obesity: 20,
    },
    {
      county: 47059,
      diabetes: 10.8,
      obesity: 33.7,
    },
    {
      county: 47061,
      diabetes: 8.6,
      obesity: 27.5,
    },
    {
      county: 47063,
      diabetes: 10.1,
      obesity: 30.9,
    },
    {
      county: 47065,
      diabetes: 10.6,
      obesity: 30,
    },
    {
      county: 47067,
      diabetes: 7.2,
      obesity: 20.7,
    },
    {
      county: 47069,
      diabetes: 10,
      obesity: 36.6,
    },
    {
      county: 47071,
      diabetes: 10.8,
      obesity: 34.6,
    },
    {
      county: 47073,
      diabetes: 9.2,
      obesity: 35.1,
    },
    {
      county: 47075,
      diabetes: 12.2,
      obesity: 31.4,
    },
    {
      county: 47077,
      diabetes: 12,
      obesity: 37,
    },
    {
      county: 47079,
      diabetes: 9,
      obesity: 27.5,
    },
    {
      county: 47081,
      diabetes: 8.8,
      obesity: 24.3,
    },
    {
      county: 47083,
      diabetes: 7.2,
      obesity: 17.9,
    },
    {
      county: 47085,
      diabetes: 7.5,
      obesity: 20.5,
    },
    {
      county: 47087,
      diabetes: 8.3,
      obesity: 22.9,
    },
    {
      county: 47089,
      diabetes: 9.3,
      obesity: 30.7,
    },
    {
      county: 47091,
      diabetes: 7.2,
      obesity: 24.7,
    },
    {
      county: 47093,
      diabetes: 11.3,
      obesity: 32.9,
    },
    {
      county: 47095,
      diabetes: 7.7,
      obesity: 17.8,
    },
    {
      county: 47097,
      diabetes: 12.4,
      obesity: 26.8,
    },
    {
      county: 47099,
      diabetes: 7.9,
      obesity: 32.7,
    },
    {
      county: 47101,
      diabetes: 7.4,
      obesity: 20.9,
    },
    {
      county: 47103,
      diabetes: 7.7,
      obesity: 27,
    },
    {
      county: 47105,
      diabetes: 7.7,
      obesity: 29.8,
    },
    {
      county: 47107,
      diabetes: 12.1,
      obesity: 30,
    },
    {
      county: 47109,
      diabetes: 8.8,
      obesity: 33.6,
    },
    {
      county: 47111,
      diabetes: 11,
      obesity: 36,
    },
    {
      county: 47113,
      diabetes: 12.9,
      obesity: 40.5,
    },
    {
      county: 47115,
      diabetes: 9.5,
      obesity: 25.1,
    },
    {
      county: 47117,
      diabetes: 8.5,
      obesity: 28.9,
    },
    {
      county: 47119,
      diabetes: 11.6,
      obesity: 33.8,
    },
    {
      county: 47121,
      diabetes: 8.5,
      obesity: 21.3,
    },
    {
      county: 47123,
      diabetes: 9.5,
      obesity: 28.9,
    },
    {
      county: 47125,
      diabetes: 12.6,
      obesity: 36.2,
    },
    {
      county: 47127,
      diabetes: 7.2,
      obesity: 18.7,
    },
    {
      county: 47129,
      diabetes: 6.9,
      obesity: 22.9,
    },
    {
      county: 47131,
      diabetes: 9.8,
      obesity: 24.3,
    },
    {
      county: 47133,
      diabetes: 8.3,
      obesity: 29.7,
    },
    {
      county: 47135,
      diabetes: 8.3,
      obesity: 21.9,
    },
    {
      county: 47137,
      diabetes: 7.6,
      obesity: 20.5,
    },
    {
      county: 47139,
      diabetes: 9.6,
      obesity: 28.7,
    },
    {
      county: 47141,
      diabetes: 10.1,
      obesity: 33.3,
    },
    {
      county: 47143,
      diabetes: 7.1,
      obesity: 27,
    },
    {
      county: 47145,
      diabetes: 9.5,
      obesity: 28.1,
    },
    {
      county: 47147,
      diabetes: 9.2,
      obesity: 25.2,
    },
    {
      county: 47149,
      diabetes: 10.8,
      obesity: 37,
    },
    {
      county: 47151,
      diabetes: 8.7,
      obesity: 26.2,
    },
    {
      county: 47153,
      diabetes: 8.8,
      obesity: 29.5,
    },
    {
      county: 47155,
      diabetes: 9.3,
      obesity: 28.6,
    },
    {
      county: 47157,
      diabetes: 11.3,
      obesity: 34.2,
    },
    {
      county: 47159,
      diabetes: 7.5,
      obesity: 28.3,
    },
    {
      county: 47161,
      diabetes: 7.1,
      obesity: 23.4,
    },
    {
      county: 47163,
      diabetes: 11.2,
      obesity: 31.7,
    },
    {
      county: 47165,
      diabetes: 10.3,
      obesity: 30.3,
    },
    {
      county: 47167,
      diabetes: 9.5,
      obesity: 31.2,
    },
    {
      county: 47169,
      diabetes: 7.3,
      obesity: 18.1,
    },
    {
      county: 47171,
      diabetes: 7.2,
      obesity: 21.4,
    },
    {
      county: 47173,
      diabetes: 7.7,
      obesity: 20.8,
    },
    {
      county: 47175,
      diabetes: 6.8,
      obesity: 18.5,
    },
    {
      county: 47177,
      diabetes: 8.9,
      obesity: 28.6,
    },
    {
      county: 47179,
      diabetes: 11.3,
      obesity: 31.8,
    },
    {
      county: 47181,
      diabetes: 7.7,
      obesity: 24.7,
    },
    {
      county: 47183,
      diabetes: 7.6,
      obesity: 28.9,
    },
    {
      county: 47185,
      diabetes: 7.7,
      obesity: 29.1,
    },
    {
      county: 47187,
      diabetes: 7.2,
      obesity: 25.3,
    },
    {
      county: 47189,
      diabetes: 10.3,
      obesity: 24.1,
    },
    {
      county: 48001,
      diabetes: 8.4,
      obesity: 23.8,
    },
    {
      county: 48003,
      diabetes: 7,
      obesity: 18.4,
    },
    {
      county: 48005,
      diabetes: 12.6,
      obesity: 39,
    },
    {
      county: 48007,
      diabetes: 8.6,
      obesity: 26.3,
    },
    {
      county: 48009,
      diabetes: 7.1,
      obesity: 19.7,
    },
    {
      county: 48011,
      diabetes: 6.9,
      obesity: 18.6,
    },
    {
      county: 48013,
      diabetes: 6.9,
      obesity: 19.5,
    },
    {
      county: 48015,
      diabetes: 8.4,
      obesity: 25.5,
    },
    {
      county: 48017,
      diabetes: 6.8,
      obesity: 17.7,
    },
    {
      county: 48019,
      diabetes: 6.5,
      obesity: 21,
    },
    {
      county: 48021,
      diabetes: 9.9,
      obesity: 32.8,
    },
    {
      county: 48023,
      diabetes: 7.1,
      obesity: 18.7,
    },
    {
      county: 48025,
      diabetes: 7.6,
      obesity: 22,
    },
    {
      county: 48027,
      diabetes: 10.9,
      obesity: 32.1,
    },
    {
      county: 48029,
      diabetes: 11.3,
      obesity: 35.1,
    },
    {
      county: 48031,
      diabetes: 6.7,
      obesity: 21.9,
    },
    {
      county: 48033,
      diabetes: 6.8,
      obesity: 17.9,
    },
    {
      county: 48035,
      diabetes: 6.7,
      obesity: 18.2,
    },
    {
      county: 48037,
      diabetes: 8.1,
      obesity: 22.4,
    },
    {
      county: 48039,
      diabetes: 11.2,
      obesity: 38.3,
    },
    {
      county: 48041,
      diabetes: 9.4,
      obesity: 30.4,
    },
    {
      county: 48043,
      diabetes: 7.1,
      obesity: 18.2,
    },
    {
      county: 48045,
      diabetes: 6.9,
      obesity: 18.1,
    },
    {
      county: 48047,
      diabetes: 6.8,
      obesity: 17.3,
    },
    {
      county: 48049,
      diabetes: 8.1,
      obesity: 21,
    },
    {
      county: 48051,
      diabetes: 7.3,
      obesity: 19,
    },
    {
      county: 48053,
      diabetes: 7,
      obesity: 21.5,
    },
    {
      county: 48055,
      diabetes: 8.2,
      obesity: 28.2,
    },
    {
      county: 48057,
      diabetes: 8.9,
      obesity: 26.4,
    },
    {
      county: 48059,
      diabetes: 7.7,
      obesity: 25.3,
    },
    {
      county: 48061,
      diabetes: 12.1,
      obesity: 39.6,
    },
    {
      county: 48063,
      diabetes: 7.2,
      obesity: 18.7,
    },
    {
      county: 48065,
      diabetes: 7.1,
      obesity: 18.3,
    },
    {
      county: 48067,
      diabetes: 7.1,
      obesity: 16.8,
    },
    {
      county: 48069,
      diabetes: 6.8,
      obesity: 17.8,
    },
    {
      county: 48071,
      diabetes: 7.3,
      obesity: 22.3,
    },
    {
      county: 48073,
      diabetes: 9.7,
      obesity: 32,
    },
    {
      county: 48075,
      diabetes: 6.9,
      obesity: 18,
    },
    {
      county: 48077,
      diabetes: 7.2,
      obesity: 19.9,
    },
    {
      county: 48079,
      diabetes: 7.2,
      obesity: 17.7,
    },
    {
      county: 48081,
      diabetes: 6.9,
      obesity: 17.7,
    },
    {
      county: 48083,
      diabetes: 7.3,
      obesity: 18.1,
    },
    {
      county: 48085,
      diabetes: 8.2,
      obesity: 23.8,
    },
    {
      county: 48087,
      diabetes: 7,
      obesity: 17.4,
    },
    {
      county: 48089,
      diabetes: 8.5,
      obesity: 22.7,
    },
    {
      county: 48091,
      diabetes: 7.6,
      obesity: 29.6,
    },
    {
      county: 48093,
      diabetes: 6.8,
      obesity: 18.1,
    },
    {
      county: 48095,
      diabetes: 7.1,
      obesity: 17.9,
    },
    {
      county: 48097,
      diabetes: 6.6,
      obesity: 19,
    },
    {
      county: 48099,
      diabetes: 7.5,
      obesity: 23,
    },
    {
      county: 48101,
      diabetes: 7.1,
      obesity: 17.7,
    },
    {
      county: 48103,
      diabetes: 6.8,
      obesity: 18,
    },
    {
      county: 48105,
      diabetes: 6.7,
      obesity: 18.8,
    },
    {
      county: 48107,
      diabetes: 6.9,
      obesity: 17.8,
    },
    {
      county: 48109,
      diabetes: 6.9,
      obesity: 18,
    },
    {
      county: 48111,
      diabetes: 6.8,
      obesity: 17.8,
    },
    {
      county: 48113,
      diabetes: 9.7,
      obesity: 30.6,
    },
    {
      county: 48115,
      diabetes: 7.2,
      obesity: 17.8,
    },
    {
      county: 48117,
      diabetes: 6.9,
      obesity: 18.2,
    },
    {
      county: 48119,
      diabetes: 7,
      obesity: 18,
    },
    {
      county: 48121,
      diabetes: 7.7,
      obesity: 29.2,
    },
    {
      county: 48123,
      diabetes: 6.9,
      obesity: 18,
    },
    {
      county: 48125,
      diabetes: 7,
      obesity: 17.2,
    },
    {
      county: 48127,
      diabetes: 7,
      obesity: 17.2,
    },
    {
      county: 48129,
      diabetes: 7,
      obesity: 17.9,
    },
    {
      county: 48131,
      diabetes: 7.1,
      obesity: 17.9,
    },
    {
      county: 48133,
      diabetes: 7,
      obesity: 18.1,
    },
    {
      county: 48135,
      diabetes: 7.5,
      obesity: 27.6,
    },
    {
      county: 48137,
      diabetes: 7.1,
      obesity: 18,
    },
    {
      county: 48139,
      diabetes: 9.4,
      obesity: 29.7,
    },
    {
      county: 48141,
      diabetes: 10.8,
      obesity: 34.9,
    },
    {
      county: 48143,
      diabetes: 6.6,
      obesity: 17,
    },
    {
      county: 48145,
      diabetes: 7.4,
      obesity: 17.6,
    },
    {
      county: 48147,
      diabetes: 6.9,
      obesity: 18.6,
    },
    {
      county: 48149,
      diabetes: 7.7,
      obesity: 25.8,
    },
    {
      county: 48151,
      diabetes: 7,
      obesity: 17,
    },
    {
      county: 48153,
      diabetes: 7.1,
      obesity: 17.8,
    },
    {
      county: 48155,
      diabetes: 6.9,
      obesity: 17.8,
    },
    {
      county: 48157,
      diabetes: 10.4,
      obesity: 27.9,
    },
    {
      county: 48159,
      diabetes: 6.9,
      obesity: 17.5,
    },
    {
      county: 48161,
      diabetes: 7.3,
      obesity: 17.7,
    },
    {
      county: 48163,
      diabetes: 6.9,
      obesity: 17.2,
    },
    {
      county: 48165,
      diabetes: 7.1,
      obesity: 17.8,
    },
    {
      county: 48167,
      diabetes: 11.3,
      obesity: 32,
    },
    {
      county: 48169,
      diabetes: 6.9,
      obesity: 17.7,
    },
    {
      county: 48171,
      diabetes: 6.7,
      obesity: 20.5,
    },
    {
      county: 48173,
      diabetes: 7.1,
      obesity: 17.6,
    },
    {
      county: 48175,
      diabetes: 7.1,
      obesity: 19.6,
    },
    {
      county: 48177,
      diabetes: 7,
      obesity: 20.2,
    },
    {
      county: 48179,
      diabetes: 7.1,
      obesity: 19.8,
    },
    {
      county: 48181,
      diabetes: 7.6,
      obesity: 24.8,
    },
    {
      county: 48183,
      diabetes: 8.7,
      obesity: 22.7,
    },
    {
      county: 48185,
      diabetes: 7.6,
      obesity: 20.8,
    },
    {
      county: 48187,
      diabetes: 7.4,
      obesity: 35,
    },
    {
      county: 48189,
      diabetes: 7.3,
      obesity: 18.5,
    },
    {
      county: 48191,
      diabetes: 7.1,
      obesity: 18.2,
    },
    {
      county: 48193,
      diabetes: 6.9,
      obesity: 17.3,
    },
    {
      county: 48195,
      diabetes: 6.9,
      obesity: 18.1,
    },
    {
      county: 48197,
      diabetes: 7.1,
      obesity: 19.3,
    },
    {
      county: 48199,
      diabetes: 8.7,
      obesity: 29.4,
    },
    {
      county: 48201,
      diabetes: 10.3,
      obesity: 32.6,
    },
    {
      county: 48203,
      diabetes: 8,
      obesity: 19,
    },
    {
      county: 48205,
      diabetes: 7.2,
      obesity: 17.6,
    },
    {
      county: 48207,
      diabetes: 7,
      obesity: 17.9,
    },
    {
      county: 48209,
      diabetes: 8.8,
      obesity: 28,
    },
    {
      county: 48211,
      diabetes: 6.9,
      obesity: 17.7,
    },
    {
      county: 48213,
      diabetes: 8.9,
      obesity: 29.1,
    },
    {
      county: 48215,
      diabetes: 13.5,
      obesity: 42.7,
    },
    {
      county: 48217,
      diabetes: 7.7,
      obesity: 21.4,
    },
    {
      county: 48219,
      diabetes: 6.9,
      obesity: 18.3,
    },
    {
      county: 48221,
      diabetes: 8.9,
      obesity: 24.7,
    },
    {
      county: 48223,
      diabetes: 7.5,
      obesity: 18.1,
    },
    {
      county: 48225,
      diabetes: 8.7,
      obesity: 22.5,
    },
    {
      county: 48227,
      diabetes: 6.9,
      obesity: 18.9,
    },
    {
      county: 48229,
      diabetes: 7.1,
      obesity: 17.4,
    },
    {
      county: 48231,
      diabetes: 8.2,
      obesity: 24.3,
    },
    {
      county: 48233,
      diabetes: 6.9,
      obesity: 18.7,
    },
    {
      county: 48235,
      diabetes: 7,
      obesity: 18.1,
    },
    {
      county: 48237,
      diabetes: 7,
      obesity: 18.1,
    },
    {
      county: 48239,
      diabetes: 7.4,
      obesity: 22.4,
    },
    {
      county: 48241,
      diabetes: 9.3,
      obesity: 25.2,
    },
    {
      county: 48243,
      diabetes: 7.1,
      obesity: 18,
    },
    {
      county: 48245,
      diabetes: 11,
      obesity: 39.6,
    },
    {
      county: 48247,
      diabetes: 6.8,
      obesity: 18.3,
    },
    {
      county: 48249,
      diabetes: 8.5,
      obesity: 20.1,
    },
    {
      county: 48251,
      diabetes: 10.8,
      obesity: 35.9,
    },
    {
      county: 48253,
      diabetes: 7.4,
      obesity: 28.1,
    },
    {
      county: 48255,
      diabetes: 7,
      obesity: 18,
    },
    {
      county: 48257,
      diabetes: 8.7,
      obesity: 25.1,
    },
    {
      county: 48259,
      diabetes: 7.5,
      obesity: 20.8,
    },
    {
      county: 48261,
      diabetes: 7,
      obesity: 17.7,
    },
    {
      county: 48263,
      diabetes: 6.9,
      obesity: 17.9,
    },
    {
      county: 48265,
      diabetes: 7.9,
      obesity: 24.7,
    },
    {
      county: 48267,
      diabetes: 7,
      obesity: 17.5,
    },
    {
      county: 48269,
      diabetes: 7,
      obesity: 17.9,
    },
    {
      county: 48271,
      diabetes: 7,
      obesity: 18,
    },
    {
      county: 48273,
      diabetes: 7.2,
      obesity: 21.6,
    },
    {
      county: 48275,
      diabetes: 7,
      obesity: 17.4,
    },
    {
      county: 48277,
      diabetes: 7,
      obesity: 18.8,
    },
    {
      county: 48279,
      diabetes: 6.9,
      obesity: 18.3,
    },
    {
      county: 48281,
      diabetes: 7.7,
      obesity: 18,
    },
    {
      county: 48283,
      diabetes: 6.9,
      obesity: 17.7,
    },
    {
      county: 48285,
      diabetes: 7,
      obesity: 17.9,
    },
    {
      county: 48287,
      diabetes: 7.3,
      obesity: 21.2,
    },
    {
      county: 48289,
      diabetes: 7.1,
      obesity: 17.8,
    },
    {
      county: 48291,
      diabetes: 7.9,
      obesity: 24.1,
    },
    {
      county: 48293,
      diabetes: 7.6,
      obesity: 18.6,
    },
    {
      county: 48295,
      diabetes: 6.8,
      obesity: 17.4,
    },
    {
      county: 48297,
      diabetes: 6.4,
      obesity: 21.8,
    },
    {
      county: 48299,
      diabetes: 7.2,
      obesity: 18.1,
    },
    {
      county: 48301,
      diabetes: 7.3,
      obesity: 17.8,
    },
    {
      county: 48303,
      diabetes: 8.6,
      obesity: 24.1,
    },
    {
      county: 48305,
      diabetes: 6.9,
      obesity: 17.8,
    },
    {
      county: 48307,
      diabetes: 7.2,
      obesity: 18.2,
    },
    {
      county: 48309,
      diabetes: 7.8,
      obesity: 22.3,
    },
    {
      county: 48311,
      diabetes: 6.9,
      obesity: 20.5,
    },
    {
      county: 48313,
      diabetes: 7.2,
      obesity: 18.9,
    },
    {
      county: 48315,
      diabetes: 7.4,
      obesity: 17.6,
    },
    {
      county: 48317,
      diabetes: 7,
      obesity: 17.9,
    },
    {
      county: 48319,
      diabetes: 7,
      obesity: 18.1,
    },
    {
      county: 48321,
      diabetes: 10.7,
      obesity: 33.6,
    },
    {
      county: 48323,
      diabetes: 13.5,
      obesity: 45.9,
    },
    {
      county: 48325,
      diabetes: 6.9,
      obesity: 19.5,
    },
    {
      county: 48327,
      diabetes: 7,
      obesity: 17.9,
    },
    {
      county: 48329,
      diabetes: 7.2,
      obesity: 23.6,
    },
    {
      county: 48331,
      diabetes: 7.1,
      obesity: 22.6,
    },
    {
      county: 48333,
      diabetes: 7.3,
      obesity: 20.1,
    },
    {
      county: 48335,
      diabetes: 7.1,
      obesity: 17.6,
    },
    {
      county: 48337,
      diabetes: 6.9,
      obesity: 21,
    },
    {
      county: 48339,
      diabetes: 8.8,
      obesity: 31.5,
    },
    {
      county: 48341,
      diabetes: 6.9,
      obesity: 21.1,
    },
    {
      county: 48343,
      diabetes: 7.4,
      obesity: 17.6,
    },
    {
      county: 48345,
      diabetes: 7.1,
      obesity: 17.8,
    },
    {
      county: 48347,
      diabetes: 10.1,
      obesity: 32.1,
    },
    {
      county: 48349,
      diabetes: 10.4,
      obesity: 27.6,
    },
    {
      county: 48351,
      diabetes: 7.9,
      obesity: 18.3,
    },
    {
      county: 48353,
      diabetes: 7.4,
      obesity: 19.2,
    },
    {
      county: 48355,
      diabetes: 10.7,
      obesity: 36.9,
    },
    {
      county: 48357,
      diabetes: 6.9,
      obesity: 17.6,
    },
    {
      county: 48359,
      diabetes: 6.9,
      obesity: 17.7,
    },
    {
      county: 48361,
      diabetes: 9.8,
      obesity: 35.8,
    },
    {
      county: 48363,
      diabetes: 7.5,
      obesity: 22.9,
    },
    {
      county: 48365,
      diabetes: 7.6,
      obesity: 18.2,
    },
    {
      county: 48367,
      diabetes: 7.9,
      obesity: 30.7,
    },
    {
      county: 48369,
      diabetes: 6.8,
      obesity: 18.4,
    },
    {
      county: 48371,
      diabetes: 7,
      obesity: 19,
    },
    {
      county: 48373,
      diabetes: 12,
      obesity: 37.8,
    },
    {
      county: 48375,
      diabetes: 7.8,
      obesity: 18.7,
    },
    {
      county: 48377,
      diabetes: 7,
      obesity: 18.2,
    },
    {
      county: 48379,
      diabetes: 6.8,
      obesity: 18.2,
    },
    {
      county: 48381,
      diabetes: 8.8,
      obesity: 22.3,
    },
    {
      county: 48383,
      diabetes: 7,
      obesity: 17.6,
    },
    {
      county: 48385,
      diabetes: 6.9,
      obesity: 17.7,
    },
    {
      county: 48387,
      diabetes: 7.7,
      obesity: 17.7,
    },
    {
      county: 48389,
      diabetes: 7.1,
      obesity: 19,
    },
    {
      county: 48391,
      diabetes: 7.1,
      obesity: 17.6,
    },
    {
      county: 48393,
      diabetes: 6.8,
      obesity: 18.1,
    },
    {
      county: 48395,
      diabetes: 7.3,
      obesity: 19.4,
    },
    {
      county: 48397,
      diabetes: 6.7,
      obesity: 20.3,
    },
    {
      county: 48399,
      diabetes: 6.9,
      obesity: 17.9,
    },
    {
      county: 48401,
      diabetes: 7.7,
      obesity: 22.5,
    },
    {
      county: 48403,
      diabetes: 8.5,
      obesity: 21.2,
    },
    {
      county: 48405,
      diabetes: 7.9,
      obesity: 18.5,
    },
    {
      county: 48407,
      diabetes: 7.6,
      obesity: 30.8,
    },
    {
      county: 48409,
      diabetes: 12.2,
      obesity: 40.7,
    },
    {
      county: 48411,
      diabetes: 6.9,
      obesity: 19.1,
    },
    {
      county: 48413,
      diabetes: 7,
      obesity: 17.8,
    },
    {
      county: 48415,
      diabetes: 6.8,
      obesity: 17.7,
    },
    {
      county: 48417,
      diabetes: 6.9,
      obesity: 18.5,
    },
    {
      county: 48419,
      diabetes: 8.1,
      obesity: 21,
    },
    {
      county: 48421,
      diabetes: 6.8,
      obesity: 17.7,
    },
    {
      county: 48423,
      diabetes: 10.3,
      obesity: 35,
    },
    {
      county: 48425,
      diabetes: 6.9,
      obesity: 19.4,
    },
    {
      county: 48427,
      diabetes: 8.5,
      obesity: 27.5,
    },
    {
      county: 48429,
      diabetes: 7.1,
      obesity: 19.7,
    },
    {
      county: 48431,
      diabetes: 7,
      obesity: 17.9,
    },
    {
      county: 48433,
      diabetes: 7.1,
      obesity: 18.8,
    },
    {
      county: 48435,
      diabetes: 7.1,
      obesity: 18,
    },
    {
      county: 48437,
      diabetes: 7.2,
      obesity: 17.7,
    },
    {
      county: 48439,
      diabetes: 10.1,
      obesity: 35.3,
    },
    {
      county: 48441,
      diabetes: 9.8,
      obesity: 32.6,
    },
    {
      county: 48443,
      diabetes: 7,
      obesity: 18,
    },
    {
      county: 48445,
      diabetes: 6.9,
      obesity: 17.4,
    },
    {
      county: 48447,
      diabetes: 6.7,
      obesity: 17.9,
    },
    {
      county: 48449,
      diabetes: 7.5,
      obesity: 19,
    },
    {
      county: 48451,
      diabetes: 7.9,
      obesity: 22.8,
    },
    {
      county: 48453,
      diabetes: 6.8,
      obesity: 25.7,
    },
    {
      county: 48455,
      diabetes: 9.6,
      obesity: 27.7,
    },
    {
      county: 48457,
      diabetes: 8.5,
      obesity: 25.3,
    },
    {
      county: 48459,
      diabetes: 6.6,
      obesity: 21,
    },
    {
      county: 48461,
      diabetes: 7.1,
      obesity: 18.2,
    },
    {
      county: 48463,
      diabetes: 7.8,
      obesity: 18.8,
    },
    {
      county: 48465,
      diabetes: 6.7,
      obesity: 21.8,
    },
    {
      county: 48467,
      diabetes: 8.1,
      obesity: 27.8,
    },
    {
      county: 48469,
      diabetes: 9.7,
      obesity: 30.9,
    },
    {
      county: 48471,
      diabetes: 9.1,
      obesity: 28.9,
    },
    {
      county: 48473,
      diabetes: 7.3,
      obesity: 19.3,
    },
    {
      county: 48475,
      diabetes: 6.9,
      obesity: 17.8,
    },
    {
      county: 48477,
      diabetes: 7.1,
      obesity: 19.7,
    },
    {
      county: 48479,
      diabetes: 7.8,
      obesity: 30.5,
    },
    {
      county: 48481,
      diabetes: 9.4,
      obesity: 25.8,
    },
    {
      county: 48483,
      diabetes: 7.1,
      obesity: 18.3,
    },
    {
      county: 48485,
      diabetes: 11.5,
      obesity: 31.8,
    },
    {
      county: 48487,
      diabetes: 8.3,
      obesity: 20.9,
    },
    {
      county: 48489,
      diabetes: 6.7,
      obesity: 22.2,
    },
    {
      county: 48491,
      diabetes: 8.3,
      obesity: 29.9,
    },
    {
      county: 48493,
      diabetes: 7.5,
      obesity: 22.3,
    },
    {
      county: 48495,
      diabetes: 7,
      obesity: 17.6,
    },
    {
      county: 48497,
      diabetes: 9.1,
      obesity: 24.1,
    },
    {
      county: 48499,
      diabetes: 7.1,
      obesity: 20.2,
    },
    {
      county: 48501,
      diabetes: 6.9,
      obesity: 18,
    },
    {
      county: 48503,
      diabetes: 8,
      obesity: 21.2,
    },
    {
      county: 48505,
      diabetes: 6.7,
      obesity: 17.4,
    },
    {
      county: 48507,
      diabetes: 11.2,
      obesity: 32.4,
    },
    {
      county: 49001,
      diabetes: 6.4,
      obesity: 22.3,
    },
    {
      county: 49003,
      diabetes: 8.2,
      obesity: 33.3,
    },
    {
      county: 49005,
      diabetes: 8.4,
      obesity: 28.1,
    },
    {
      county: 49007,
      diabetes: 8.8,
      obesity: 31.8,
    },
    {
      county: 49009,
      diabetes: 7.2,
      obesity: 18.8,
    },
    {
      county: 49011,
      diabetes: 8.7,
      obesity: 32,
    },
    {
      county: 49013,
      diabetes: 7.7,
      obesity: 29.7,
    },
    {
      county: 49015,
      diabetes: 9.6,
      obesity: 30.5,
    },
    {
      county: 49017,
      diabetes: 7.6,
      obesity: 22.8,
    },
    {
      county: 49019,
      diabetes: 6.5,
      obesity: 21.3,
    },
    {
      county: 49021,
      diabetes: 7,
      obesity: 25.4,
    },
    {
      county: 49023,
      diabetes: 8.9,
      obesity: 27.2,
    },
    {
      county: 49025,
      diabetes: 7.4,
      obesity: 23.5,
    },
    {
      county: 49027,
      diabetes: 10.5,
      obesity: 26.3,
    },
    {
      county: 49029,
      diabetes: 6,
      obesity: 21.7,
    },
    {
      county: 49031,
      diabetes: 7.2,
      obesity: 19,
    },
    {
      county: 49033,
      diabetes: 6.3,
      obesity: 16.9,
    },
    {
      county: 49035,
      diabetes: 8.6,
      obesity: 29.1,
    },
    {
      county: 49037,
      diabetes: 11.2,
      obesity: 31,
    },
    {
      county: 49039,
      diabetes: 7.9,
      obesity: 27.3,
    },
    {
      county: 49041,
      diabetes: 8.2,
      obesity: 31.8,
    },
    {
      county: 49043,
      diabetes: 5.2,
      obesity: 15.3,
    },
    {
      county: 49045,
      diabetes: 9.8,
      obesity: 35.4,
    },
    {
      county: 49047,
      diabetes: 10.5,
      obesity: 36.2,
    },
    {
      county: 49049,
      diabetes: 7.4,
      obesity: 27.7,
    },
    {
      county: 49051,
      diabetes: 5.8,
      obesity: 26.6,
    },
    {
      county: 49053,
      diabetes: 6.9,
      obesity: 28.1,
    },
    {
      county: 49055,
      diabetes: 7.3,
      obesity: 18.1,
    },
    {
      county: 49057,
      diabetes: 9,
      obesity: 33.3,
    },
    {
      county: 50001,
      diabetes: 5.4,
      obesity: 25.3,
    },
    {
      county: 50003,
      diabetes: 7.5,
      obesity: 24.7,
    },
    {
      county: 50005,
      diabetes: 7.3,
      obesity: 28.4,
    },
    {
      county: 50007,
      diabetes: 5.8,
      obesity: 20.4,
    },
    {
      county: 50009,
      diabetes: 8.8,
      obesity: 28.2,
    },
    {
      county: 50011,
      diabetes: 8.3,
      obesity: 35.1,
    },
    {
      county: 50013,
      diabetes: 6.9,
      obesity: 27.8,
    },
    {
      county: 50015,
      diabetes: 6.6,
      obesity: 23,
    },
    {
      county: 50017,
      diabetes: 7.4,
      obesity: 29.2,
    },
    {
      county: 50019,
      diabetes: 7.2,
      obesity: 31.6,
    },
    {
      county: 50021,
      diabetes: 7.8,
      obesity: 32.3,
    },
    {
      county: 50023,
      diabetes: 6.5,
      obesity: 26.8,
    },
    {
      county: 50025,
      diabetes: 5.6,
      obesity: 24,
    },
    {
      county: 50027,
      diabetes: 6.6,
      obesity: 28.2,
    },
    {
      county: 51001,
      diabetes: 9.3,
      obesity: 32.4,
    },
    {
      county: 51003,
      diabetes: 7.7,
      obesity: 20.7,
    },
    {
      county: 51005,
      diabetes: 8.6,
      obesity: 30.7,
    },
    {
      county: 51007,
      diabetes: 8.1,
      obesity: 25.3,
    },
    {
      county: 51009,
      diabetes: 11.4,
      obesity: 29.4,
    },
    {
      county: 51011,
      diabetes: 8,
      obesity: 27.9,
    },
    {
      county: 51013,
      diabetes: 6.6,
      obesity: 21.6,
    },
    {
      county: 51015,
      diabetes: 10.3,
      obesity: 31.8,
    },
    {
      county: 51017,
      diabetes: 8.2,
      obesity: 23.1,
    },
    {
      county: 51019,
      diabetes: 7.9,
      obesity: 29.8,
    },
    {
      county: 51021,
      diabetes: 9,
      obesity: 24.3,
    },
    {
      county: 51023,
      diabetes: 7.9,
      obesity: 29,
    },
    {
      county: 51025,
      diabetes: 10.1,
      obesity: 25.4,
    },
    {
      county: 51027,
      diabetes: 9,
      obesity: 30.4,
    },
    {
      county: 51029,
      diabetes: 9.3,
      obesity: 34.2,
    },
    {
      county: 51031,
      diabetes: 10.2,
      obesity: 39.4,
    },
    {
      county: 51033,
      diabetes: 10.5,
      obesity: 27,
    },
    {
      county: 51035,
      diabetes: 7.9,
      obesity: 27.7,
    },
    {
      county: 51036,
      diabetes: 9.1,
      obesity: 16.8,
    },
    {
      county: 51037,
      diabetes: 9.8,
      obesity: 28.9,
    },
    {
      county: 51041,
      diabetes: 11.3,
      obesity: 35.7,
    },
    {
      county: 51043,
      diabetes: 6.3,
      obesity: 19.4,
    },
    {
      county: 51045,
      diabetes: 7.1,
      obesity: 21.3,
    },
    {
      county: 51047,
      diabetes: 10.3,
      obesity: 29.2,
    },
    {
      county: 51049,
      diabetes: 8.9,
      obesity: 26.9,
    },
    {
      county: 51051,
      diabetes: 8.2,
      obesity: 27.9,
    },
    {
      county: 51053,
      diabetes: 9.9,
      obesity: 36.3,
    },
    {
      county: 51057,
      diabetes: 9.5,
      obesity: 24.2,
    },
    {
      county: 51059,
      diabetes: 6.2,
      obesity: 21.4,
    },
    {
      county: 51061,
      diabetes: 7.4,
      obesity: 26.5,
    },
    {
      county: 51063,
      diabetes: 6.5,
      obesity: 22.2,
    },
    {
      county: 51065,
      diabetes: 7.6,
      obesity: 24.5,
    },
    {
      county: 51067,
      diabetes: 7.9,
      obesity: 33.5,
    },
    {
      county: 51069,
      diabetes: 7,
      obesity: 27.5,
    },
    {
      county: 51071,
      diabetes: 9,
      obesity: 24.7,
    },
    {
      county: 51073,
      diabetes: 8.2,
      obesity: 28.2,
    },
    {
      county: 51075,
      diabetes: 8.5,
      obesity: 24.1,
    },
    {
      county: 51077,
      diabetes: 8.2,
      obesity: 29,
    },
    {
      county: 51079,
      diabetes: 7.6,
      obesity: 25.3,
    },
    {
      county: 51081,
      diabetes: 10.6,
      obesity: 23.5,
    },
    {
      county: 51083,
      diabetes: 11,
      obesity: 28.4,
    },
    {
      county: 51085,
      diabetes: 8.4,
      obesity: 33.9,
    },
    {
      county: 51087,
      diabetes: 9.3,
      obesity: 31.7,
    },
    {
      county: 51089,
      diabetes: 12.3,
      obesity: 37,
    },
    {
      county: 51091,
      diabetes: 6.7,
      obesity: 20,
    },
    {
      county: 51093,
      diabetes: 8.7,
      obesity: 26.9,
    },
    {
      county: 51095,
      diabetes: 8.6,
      obesity: 25.6,
    },
    {
      county: 51097,
      diabetes: 7.5,
      obesity: 19.2,
    },
    {
      county: 51099,
      diabetes: 8.3,
      obesity: 31.7,
    },
    {
      county: 51101,
      diabetes: 7.4,
      obesity: 26.5,
    },
    {
      county: 51103,
      diabetes: 9,
      obesity: 21,
    },
    {
      county: 51105,
      diabetes: 10.9,
      obesity: 30.9,
    },
    {
      county: 51107,
      diabetes: 6.4,
      obesity: 25.4,
    },
    {
      county: 51109,
      diabetes: 8.1,
      obesity: 29.6,
    },
    {
      county: 51111,
      diabetes: 10,
      obesity: 29.8,
    },
    {
      county: 51113,
      diabetes: 7.9,
      obesity: 22.8,
    },
    {
      county: 51115,
      diabetes: 7.2,
      obesity: 24.1,
    },
    {
      county: 51117,
      diabetes: 12.6,
      obesity: 34.4,
    },
    {
      county: 51119,
      diabetes: 8.4,
      obesity: 19.7,
    },
    {
      county: 51121,
      diabetes: 9.5,
      obesity: 29.3,
    },
    {
      county: 51125,
      diabetes: 7.2,
      obesity: 22.2,
    },
    {
      county: 51127,
      diabetes: 7,
      obesity: 25.7,
    },
    {
      county: 51131,
      diabetes: 8.9,
      obesity: 33.7,
    },
    {
      county: 51133,
      diabetes: 7.1,
      obesity: 19.4,
    },
    {
      county: 51135,
      diabetes: 9.9,
      obesity: 25.9,
    },
    {
      county: 51137,
      diabetes: 8.8,
      obesity: 25.2,
    },
    {
      county: 51139,
      diabetes: 8.9,
      obesity: 31.6,
    },
    {
      county: 51141,
      diabetes: 8.7,
      obesity: 24.8,
    },
    {
      county: 51143,
      diabetes: 10.4,
      obesity: 34.2,
    },
    {
      county: 51145,
      diabetes: 7.6,
      obesity: 25.4,
    },
    {
      county: 51147,
      diabetes: 10,
      obesity: 23.4,
    },
    {
      county: 51149,
      diabetes: 10.1,
      obesity: 31.1,
    },
    {
      county: 51153,
      diabetes: 9.3,
      obesity: 32.4,
    },
    {
      county: 51155,
      diabetes: 7.6,
      obesity: 26.2,
    },
    {
      county: 51157,
      diabetes: 7.8,
      obesity: 19.8,
    },
    {
      county: 51159,
      diabetes: 8.4,
      obesity: 31.9,
    },
    {
      county: 51161,
      diabetes: 11.8,
      obesity: 30.7,
    },
    {
      county: 51163,
      diabetes: 9,
      obesity: 24.3,
    },
    {
      county: 51165,
      diabetes: 9.1,
      obesity: 29.2,
    },
    {
      county: 51167,
      diabetes: 9.9,
      obesity: 36.4,
    },
    {
      county: 51169,
      diabetes: 11.4,
      obesity: 32,
    },
    {
      county: 51171,
      diabetes: 8.2,
      obesity: 34,
    },
    {
      county: 51173,
      diabetes: 8.8,
      obesity: 38.3,
    },
    {
      county: 51175,
      diabetes: 10.2,
      obesity: 31.7,
    },
    {
      county: 51177,
      diabetes: 8.6,
      obesity: 32.2,
    },
    {
      county: 51179,
      diabetes: 9.5,
      obesity: 34.1,
    },
    {
      county: 51181,
      diabetes: 8,
      obesity: 20,
    },
    {
      county: 51183,
      diabetes: 9.6,
      obesity: 31.1,
    },
    {
      county: 51185,
      diabetes: 10.2,
      obesity: 38.7,
    },
    {
      county: 51187,
      diabetes: 7.9,
      obesity: 24.5,
    },
    {
      county: 51191,
      diabetes: 8.9,
      obesity: 29.5,
    },
    {
      county: 51193,
      diabetes: 9.4,
      obesity: 27.8,
    },
    {
      county: 51195,
      diabetes: 12.4,
      obesity: 34.9,
    },
    {
      county: 51197,
      diabetes: 9.2,
      obesity: 35.9,
    },
    {
      county: 51199,
      diabetes: 7.8,
      obesity: 26.4,
    },
    {
      county: 51510,
      diabetes: 7,
      obesity: 22.1,
    },
    {
      county: 51515,
      diabetes: "No Data",
      obesity: "No Data",
    },
    {
      county: 51520,
      diabetes: 8,
      obesity: 20.9,
    },
    {
      county: 51530,
      diabetes: 6.9,
      obesity: 18.9,
    },
    {
      county: 51540,
      diabetes: 7,
      obesity: 19.5,
    },
    {
      county: 51550,
      diabetes: 12.3,
      obesity: 35.8,
    },
    {
      county: 51570,
      diabetes: 8.6,
      obesity: 31.4,
    },
    {
      county: 51580,
      diabetes: 7.1,
      obesity: 17.6,
    },
    {
      county: 51590,
      diabetes: 11.2,
      obesity: 29.2,
    },
    {
      county: 51595,
      diabetes: 8.4,
      obesity: 17.3,
    },
    {
      county: 51600,
      diabetes: 9.3,
      obesity: 23.7,
    },
    {
      county: 51610,
      diabetes: 7.8,
      obesity: 18.9,
    },
    {
      county: 51620,
      diabetes: 8.1,
      obesity: 23.5,
    },
    {
      county: 51630,
      diabetes: 7.3,
      obesity: 22.6,
    },
    {
      county: 51640,
      diabetes: 7.2,
      obesity: 18.4,
    },
    {
      county: 51650,
      diabetes: 10.8,
      obesity: 35.4,
    },
    {
      county: 51660,
      diabetes: 8,
      obesity: 26.9,
    },
    {
      county: 51670,
      diabetes: 10.2,
      obesity: 27.5,
    },
    {
      county: 51678,
      diabetes: 7.2,
      obesity: 17.7,
    },
    {
      county: 51680,
      diabetes: 7.4,
      obesity: 27.4,
    },
    {
      county: 51683,
      diabetes: 7.7,
      obesity: 20.9,
    },
    {
      county: 51685,
      diabetes: 8.1,
      obesity: 21.3,
    },
    {
      county: 51690,
      diabetes: 8.1,
      obesity: 18.2,
    },
    {
      county: 51700,
      diabetes: 10.9,
      obesity: 39,
    },
    {
      county: 51710,
      diabetes: 9.2,
      obesity: 34.7,
    },
    {
      county: 51720,
      diabetes: 7.6,
      obesity: 17.9,
    },
    {
      county: 51730,
      diabetes: 11.5,
      obesity: 38.6,
    },
    {
      county: 51735,
      diabetes: 7.5,
      obesity: 21.3,
    },
    {
      county: 51740,
      diabetes: 14.9,
      obesity: 39,
    },
    {
      county: 51750,
      diabetes: 7.7,
      obesity: 20.9,
    },
    {
      county: 51760,
      diabetes: 10.4,
      obesity: 28.9,
    },
    {
      county: 51770,
      diabetes: 10.7,
      obesity: 31.1,
    },
    {
      county: 51775,
      diabetes: 8.2,
      obesity: 23.7,
    },
    {
      county: 51790,
      diabetes: 7.2,
      obesity: 18.8,
    },
    {
      county: 51800,
      diabetes: 10.9,
      obesity: 29.6,
    },
    {
      county: 51810,
      diabetes: 9.9,
      obesity: 30.5,
    },
    {
      county: 51820,
      diabetes: 7.1,
      obesity: 18.1,
    },
    {
      county: 51830,
      diabetes: 7.3,
      obesity: 19.5,
    },
    {
      county: 51840,
      diabetes: 7.9,
      obesity: 21.6,
    },
    {
      county: 53001,
      diabetes: 10.1,
      obesity: 31.4,
    },
    {
      county: 53003,
      diabetes: 9.7,
      obesity: 29.9,
    },
    {
      county: 53005,
      diabetes: 8.4,
      obesity: 31.8,
    },
    {
      county: 53007,
      diabetes: 7.8,
      obesity: 27.6,
    },
    {
      county: 53009,
      diabetes: 7,
      obesity: 25.7,
    },
    {
      county: 53011,
      diabetes: 8.6,
      obesity: 34.2,
    },
    {
      county: 53013,
      diabetes: 8.6,
      obesity: 27.4,
    },
    {
      county: 53015,
      diabetes: 8.9,
      obesity: 38.5,
    },
    {
      county: 53017,
      diabetes: 7.8,
      obesity: 30,
    },
    {
      county: 53019,
      diabetes: 8.4,
      obesity: 25.7,
    },
    {
      county: 53021,
      diabetes: 8.9,
      obesity: 36.8,
    },
    {
      county: 53023,
      diabetes: 7.5,
      obesity: 28.8,
    },
    {
      county: 53025,
      diabetes: 10.3,
      obesity: 33.2,
    },
    {
      county: 53027,
      diabetes: 10.3,
      obesity: 35.3,
    },
    {
      county: 53029,
      diabetes: 7.2,
      obesity: 26.8,
    },
    {
      county: 53031,
      diabetes: 6.9,
      obesity: 20,
    },
    {
      county: 53033,
      diabetes: 6.8,
      obesity: 21.5,
    },
    {
      county: 53035,
      diabetes: 8.2,
      obesity: 30.8,
    },
    {
      county: 53037,
      diabetes: 7.4,
      obesity: 24.9,
    },
    {
      county: 53039,
      diabetes: 7.6,
      obesity: 26.5,
    },
    {
      county: 53041,
      diabetes: 9.3,
      obesity: 31.1,
    },
    {
      county: 53043,
      diabetes: 7.9,
      obesity: 34.9,
    },
    {
      county: 53045,
      diabetes: 8.5,
      obesity: 31.5,
    },
    {
      county: 53047,
      diabetes: 9.1,
      obesity: 29.4,
    },
    {
      county: 53049,
      diabetes: 9.1,
      obesity: 35.1,
    },
    {
      county: 53051,
      diabetes: 7.5,
      obesity: 24.1,
    },
    {
      county: 53053,
      diabetes: 9.5,
      obesity: 32.4,
    },
    {
      county: 53055,
      diabetes: 4.6,
      obesity: 19,
    },
    {
      county: 53057,
      diabetes: 7.3,
      obesity: 30.1,
    },
    {
      county: 53059,
      diabetes: 6.6,
      obesity: 28.2,
    },
    {
      county: 53061,
      diabetes: 8.3,
      obesity: 31,
    },
    {
      county: 53063,
      diabetes: 8.2,
      obesity: 31.4,
    },
    {
      county: 53065,
      diabetes: 6.8,
      obesity: 28.3,
    },
    {
      county: 53067,
      diabetes: 7.9,
      obesity: 31.3,
    },
    {
      county: 53069,
      diabetes: 10.9,
      obesity: 34.7,
    },
    {
      county: 53071,
      diabetes: 8.2,
      obesity: 25.2,
    },
    {
      county: 53073,
      diabetes: 7.2,
      obesity: 26.3,
    },
    {
      county: 53075,
      diabetes: 6.9,
      obesity: 28.6,
    },
    {
      county: 53077,
      diabetes: 9.2,
      obesity: 36.5,
    },
    {
      county: 54001,
      diabetes: 10.9,
      obesity: 26.5,
    },
    {
      county: 54003,
      diabetes: 11.7,
      obesity: 37,
    },
    {
      county: 54005,
      diabetes: 14.4,
      obesity: 44.8,
    },
    {
      county: 54007,
      diabetes: 10.7,
      obesity: 30.6,
    },
    {
      county: 54009,
      diabetes: 11.2,
      obesity: 31,
    },
    {
      county: 54011,
      diabetes: 10.7,
      obesity: 36.8,
    },
    {
      county: 54013,
      diabetes: 8.7,
      obesity: 30.2,
    },
    {
      county: 54015,
      diabetes: 8.6,
      obesity: 28.3,
    },
    {
      county: 54017,
      diabetes: 9.7,
      obesity: 29,
    },
    {
      county: 54019,
      diabetes: 15.1,
      obesity: 35.6,
    },
    {
      county: 54021,
      diabetes: 9.5,
      obesity: 23.8,
    },
    {
      county: 54023,
      diabetes: 10.1,
      obesity: 30.4,
    },
    {
      county: 54025,
      diabetes: 11.1,
      obesity: 33.4,
    },
    {
      county: 54027,
      diabetes: 8.4,
      obesity: 34.2,
    },
    {
      county: 54029,
      diabetes: 10.5,
      obesity: 33.6,
    },
    {
      county: 54031,
      diabetes: 9.6,
      obesity: 27.5,
    },
    {
      county: 54033,
      diabetes: 13.2,
      obesity: 37.3,
    },
    {
      county: 54035,
      diabetes: 10.8,
      obesity: 34,
    },
    {
      county: 54037,
      diabetes: 8.8,
      obesity: 29.9,
    },
    {
      county: 54039,
      diabetes: 12.4,
      obesity: 37.7,
    },
    {
      county: 54041,
      diabetes: 8.3,
      obesity: 30.6,
    },
    {
      county: 54043,
      diabetes: 11.9,
      obesity: 39.7,
    },
    {
      county: 54045,
      diabetes: 14.4,
      obesity: 43,
    },
    {
      county: 54047,
      diabetes: 13.7,
      obesity: 39.2,
    },
    {
      county: 54049,
      diabetes: 9.8,
      obesity: 39.4,
    },
    {
      county: 54051,
      diabetes: 9.8,
      obesity: 34.8,
    },
    {
      county: 54053,
      diabetes: 10,
      obesity: 38.1,
    },
    {
      county: 54055,
      diabetes: 11.6,
      obesity: 34.8,
    },
    {
      county: 54057,
      diabetes: 11.8,
      obesity: 34.6,
    },
    {
      county: 54059,
      diabetes: 13.2,
      obesity: 42.1,
    },
    {
      county: 54061,
      diabetes: 9.3,
      obesity: 32.2,
    },
    {
      county: 54063,
      diabetes: 9.2,
      obesity: 34.8,
    },
    {
      county: 54065,
      diabetes: 9.6,
      obesity: 27.8,
    },
    {
      county: 54067,
      diabetes: 10.8,
      obesity: 33.7,
    },
    {
      county: 54069,
      diabetes: 9.7,
      obesity: 29.1,
    },
    {
      county: 54071,
      diabetes: 10.2,
      obesity: 28.6,
    },
    {
      county: 54073,
      diabetes: 7.2,
      obesity: 22.7,
    },
    {
      county: 54075,
      diabetes: 9.4,
      obesity: 24.9,
    },
    {
      county: 54077,
      diabetes: 10.9,
      obesity: 39.2,
    },
    {
      county: 54079,
      diabetes: 10.9,
      obesity: 36.5,
    },
    {
      county: 54081,
      diabetes: 12.5,
      obesity: 39.8,
    },
    {
      county: 54083,
      diabetes: 10,
      obesity: 32.3,
    },
    {
      county: 54085,
      diabetes: 9.9,
      obesity: 34.9,
    },
    {
      county: 54087,
      diabetes: 10.8,
      obesity: 40.2,
    },
    {
      county: 54089,
      diabetes: 7.8,
      obesity: 36.1,
    },
    {
      county: 54091,
      diabetes: 11,
      obesity: 34.6,
    },
    {
      county: 54093,
      diabetes: 8,
      obesity: 30.9,
    },
    {
      county: 54095,
      diabetes: 9.9,
      obesity: 34.5,
    },
    {
      county: 54097,
      diabetes: 9.7,
      obesity: 32.2,
    },
    {
      county: 54099,
      diabetes: 13,
      obesity: 35.5,
    },
    {
      county: 54101,
      diabetes: 10.1,
      obesity: 30.4,
    },
    {
      county: 54103,
      diabetes: 9.5,
      obesity: 36.9,
    },
    {
      county: 54105,
      diabetes: 7.2,
      obesity: 20.4,
    },
    {
      county: 54107,
      diabetes: 11.9,
      obesity: 40.5,
    },
    {
      county: 54109,
      diabetes: 11.5,
      obesity: 35.7,
    },
    {
      county: 55001,
      diabetes: 7.7,
      obesity: 26.9,
    },
    {
      county: 55003,
      diabetes: 7.3,
      obesity: 34.8,
    },
    {
      county: 55005,
      diabetes: 7.5,
      obesity: 28.3,
    },
    {
      county: 55007,
      diabetes: 6.1,
      obesity: 26.8,
    },
    {
      county: 55009,
      diabetes: 7.8,
      obesity: 33.6,
    },
    {
      county: 55011,
      diabetes: 7.6,
      obesity: 21.4,
    },
    {
      county: 55013,
      diabetes: 8,
      obesity: 20.5,
    },
    {
      county: 55015,
      diabetes: 7.8,
      obesity: 21.3,
    },
    {
      county: 55017,
      diabetes: 7.2,
      obesity: 30.7,
    },
    {
      county: 55019,
      diabetes: 6.8,
      obesity: 27.8,
    },
    {
      county: 55021,
      diabetes: 7.1,
      obesity: 30.8,
    },
    {
      county: 55023,
      diabetes: 6.6,
      obesity: 21.5,
    },
    {
      county: 55025,
      diabetes: 6.1,
      obesity: 23.9,
    },
    {
      county: 55027,
      diabetes: 7.4,
      obesity: 36.9,
    },
    {
      county: 55029,
      diabetes: 7.1,
      obesity: 19,
    },
    {
      county: 55031,
      diabetes: 7.7,
      obesity: 23,
    },
    {
      county: 55033,
      diabetes: 7.7,
      obesity: 27.8,
    },
    {
      county: 55035,
      diabetes: 6.5,
      obesity: 27.9,
    },
    {
      county: 55037,
      diabetes: 7.6,
      obesity: 25.5,
    },
    {
      county: 55039,
      diabetes: 6.5,
      obesity: 31.8,
    },
    {
      county: 55041,
      diabetes: 9,
      obesity: 30.8,
    },
    {
      county: 55043,
      diabetes: 6,
      obesity: 31.5,
    },
    {
      county: 55045,
      diabetes: 6,
      obesity: 27.2,
    },
    {
      county: 55047,
      diabetes: 8.1,
      obesity: 21.3,
    },
    {
      county: 55049,
      diabetes: 6.9,
      obesity: 26.2,
    },
    {
      county: 55051,
      diabetes: 7,
      obesity: 19.4,
    },
    {
      county: 55053,
      diabetes: 7.8,
      obesity: 22.8,
    },
    {
      county: 55055,
      diabetes: 6.5,
      obesity: 31.7,
    },
    {
      county: 55057,
      diabetes: 6.5,
      obesity: 27.8,
    },
    {
      county: 55059,
      diabetes: 8.2,
      obesity: 30.8,
    },
    {
      county: 55061,
      diabetes: 7.3,
      obesity: 23,
    },
    {
      county: 55063,
      diabetes: 7.2,
      obesity: 26.3,
    },
    {
      county: 55065,
      diabetes: 8,
      obesity: 24.5,
    },
    {
      county: 55067,
      diabetes: 7.4,
      obesity: 28.5,
    },
    {
      county: 55069,
      diabetes: 6.7,
      obesity: 32.5,
    },
    {
      county: 55071,
      diabetes: 7.1,
      obesity: 23.5,
    },
    {
      county: 55073,
      diabetes: 8.8,
      obesity: 31.8,
    },
    {
      county: 55075,
      diabetes: 5.8,
      obesity: 30.5,
    },
    {
      county: 55077,
      diabetes: 6.9,
      obesity: 25.1,
    },
    {
      county: 55078,
      diabetes: 12.2,
      obesity: 40.2,
    },
    {
      county: 55079,
      diabetes: 9.6,
      obesity: 36.1,
    },
    {
      county: 55081,
      diabetes: 7.6,
      obesity: 29.6,
    },
    {
      county: 55083,
      diabetes: 7.4,
      obesity: 28.4,
    },
    {
      county: 55085,
      diabetes: 7.5,
      obesity: 27,
    },
    {
      county: 55087,
      diabetes: 7.7,
      obesity: 31.2,
    },
    {
      county: 55089,
      diabetes: 6.2,
      obesity: 24.5,
    },
    {
      county: 55091,
      diabetes: 7.4,
      obesity: 21.9,
    },
    {
      county: 55093,
      diabetes: 7.3,
      obesity: 23.6,
    },
    {
      county: 55095,
      diabetes: 8.2,
      obesity: 23.4,
    },
    {
      county: 55097,
      diabetes: 6.9,
      obesity: 25.3,
    },
    {
      county: 55099,
      diabetes: 7.9,
      obesity: 32,
    },
    {
      county: 55101,
      diabetes: 8.1,
      obesity: 36,
    },
    {
      county: 55103,
      diabetes: 7.7,
      obesity: 21.7,
    },
    {
      county: 55105,
      diabetes: 8.1,
      obesity: 32.6,
    },
    {
      county: 55107,
      diabetes: 8.9,
      obesity: 20.9,
    },
    {
      county: 55109,
      diabetes: 7.8,
      obesity: 29.8,
    },
    {
      county: 55111,
      diabetes: 7.4,
      obesity: 30.2,
    },
    {
      county: 55113,
      diabetes: 9.9,
      obesity: 29.7,
    },
    {
      county: 55115,
      diabetes: 9.6,
      obesity: 33,
    },
    {
      county: 55117,
      diabetes: 7.9,
      obesity: 34,
    },
    {
      county: 55119,
      diabetes: 6.4,
      obesity: 27.3,
    },
    {
      county: 55121,
      diabetes: 7.3,
      obesity: 25.8,
    },
    {
      county: 55123,
      diabetes: 6,
      obesity: 20.9,
    },
    {
      county: 55125,
      diabetes: 8,
      obesity: 31.4,
    },
    {
      county: 55127,
      diabetes: 6.6,
      obesity: 30.6,
    },
    {
      county: 55129,
      diabetes: 6.1,
      obesity: 24.8,
    },
    {
      county: 55131,
      diabetes: 7.3,
      obesity: 27.3,
    },
    {
      county: 55133,
      diabetes: 6.9,
      obesity: 24.9,
    },
    {
      county: 55135,
      diabetes: 8.9,
      obesity: 36,
    },
    {
      county: 55137,
      diabetes: 7.2,
      obesity: 26.5,
    },
    {
      county: 55139,
      diabetes: 8.5,
      obesity: 33.1,
    },
    {
      county: 55141,
      diabetes: 8.7,
      obesity: 32.5,
    },
    {
      county: 56001,
      diabetes: 6.3,
      obesity: 24.8,
    },
    {
      county: 56003,
      diabetes: 7.7,
      obesity: 27,
    },
    {
      county: 56005,
      diabetes: 7.4,
      obesity: 36.5,
    },
    {
      county: 56007,
      diabetes: 8.3,
      obesity: 31.2,
    },
    {
      county: 56009,
      diabetes: 8.2,
      obesity: 32,
    },
    {
      county: 56011,
      diabetes: 6.5,
      obesity: 29.1,
    },
    {
      county: 56013,
      diabetes: 7.5,
      obesity: 23.5,
    },
    {
      county: 56015,
      diabetes: 7.7,
      obesity: 34.1,
    },
    {
      county: 56017,
      diabetes: 7.5,
      obesity: 27.1,
    },
    {
      county: 56019,
      diabetes: 5.7,
      obesity: 25.5,
    },
    {
      county: 56021,
      diabetes: 8.3,
      obesity: 28.7,
    },
    {
      county: 56023,
      diabetes: 8.5,
      obesity: 27.8,
    },
    {
      county: 56025,
      diabetes: 7,
      obesity: 31.8,
    },
    {
      county: 56027,
      diabetes: 6.7,
      obesity: 26.7,
    },
    {
      county: 56029,
      diabetes: 5.5,
      obesity: 27.2,
    },
    {
      county: 56031,
      diabetes: 6.5,
      obesity: 24.5,
    },
    {
      county: 56033,
      diabetes: 7.2,
      obesity: 27.2,
    },
    {
      county: 56035,
      diabetes: 5.9,
      obesity: 23.2,
    },
    {
      county: 56037,
      diabetes: 7.2,
      obesity: 33.6,
    },
    {
      county: 56039,
      diabetes: 4.1,
      obesity: 11,
    },
    {
      county: 56041,
      diabetes: 7.2,
      obesity: 33.2,
    },
    {
      county: 56043,
      diabetes: 7.6,
      obesity: 24.1,
    },
    {
      county: 56045,
      diabetes: 6.9,
      obesity: 31.3,
    },
  ];

  const svgRef = useRef();

  useEffect(() => {
    chart();
  }, []);

  const chart = () => {
    const svg = d3
      .select(svgRef.current)
      // .attr("width", )
      .attr("height", 610)
      .attr("viewBox", [0, 0, 975, 610])
      .attr("style", "width: 100%; height: auto;");
    const x = d3.scaleQuantile(
      Array.from(data, (d) => d.diabetes),
      d3.range(n)
    );
    const y = d3.scaleQuantile(
      Array.from(data, (d) => d.obesity),
      d3.range(n)
    );

    const index = d3.index(data, (d) => d.county);

    const path = d3.geoPath();

    const color = (value) => {
      if (!value) return "#ccc";
      const { diabetes: a, obesity: b } = value;
      return colors[y(b) + x(a) * n];
    };

    const format = (value) => {
      if (!value) return "N/A";
      const { diabetes: a, obesity: b } = value;
      return `${a}% Diabetes${labels[x(a)] && ` (${labels[x(a)]})`}
    ${b}% Obesity${labels[y(b)] && ` (${labels[y(b)]})`}`;
    };

    svg
      .append("g")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .join("path")
      .attr("fill", (d) => {
        return color(index.get(d.id));
      })
      .attr("d", path)
      .append("title")
      .text(
        (d) => `${d.properties.name}, ${states.get(d.id.slice(0, 2)).name}
  ${format(index.get(d.id))}`
      );
    svg
      .append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);
  };
  return <svg ref={svgRef}></svg>;
};
export default SimpleTreemap;
