package com.example.washingmachines;

public class WashingMachine {
    private String type; // top, front, hybrid
    private String brandName; // LG, Samsung, BSH, Whirlpool, Videocon, Gorenje
    private int weight; // 60kg, 80kg, 150kg, 220kg, 360kg
    private int maxRpm; // 800, 1200, 1600, 2000
    private int washTemp; // 40C, 36C
    private boolean hasEnergyStar;
    private int powerUsage; // 100kwh, 150kwh, 200kwh

    public WashingMachine() {

    }

    public WashingMachine(String type, String brandName, int weight,
            int maxRpm, int washTemp, boolean hasEnergyStar, int powerUsage) {
        super();
        this.type = type;
        this.brandName = brandName;
        this.weight = weight;
        this.maxRpm = maxRpm;
        this.washTemp = washTemp;
        this.hasEnergyStar = hasEnergyStar;
        this.powerUsage = powerUsage;
    }

    public String getType() {
        return type;
    }

    public String getBrandName() {
        return brandName;
    }

    public String getWeight() {
        return String.valueOf(weight) + " kg";
    }

    public String getMaxRpm() {
        return String.valueOf(maxRpm) + " rpm";
    }

    public String getWashTemp() {
        return String.valueOf(washTemp) + " C";
    }

    public boolean isHasEnergyStar() {
        return hasEnergyStar;
    }

    public String getPowerUsage() {
        return String.valueOf(powerUsage) + " KWh";
    }

}