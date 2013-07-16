package com.example.washingmachines;

import java.util.ArrayList;
import java.util.List;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.view.Menu;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.ListView;

public class MainActivity extends Activity {

	private ListView machines = null;
	private List<WashingMachine> listOfMachines = new ArrayList<WashingMachine>();
	private ArrayAdapter<String> adapter = null;
	private List<String> machinesList = new ArrayList<String>();
	
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		initView();
	}

	private void initView() {

		this.machines = (ListView) findViewById(R.id.scroll_view);

		WashingMachine wm1 = new WashingMachine(WMConstants.FRONT_TYPE, WMConstants.LG, 65, 1200, 41,
				false, 100);
		this.listOfMachines.add(wm1);

		WashingMachine wm2 = new WashingMachine(WMConstants.TOP_TYPE, WMConstants.SAMSUNG, 73, 800, 60,
				false, 90);
		this.listOfMachines.add(wm2);

		WashingMachine wm3 = new WashingMachine(WMConstants.HYBRID_TYPE, WMConstants.BSH, 52, 1650, 36,
				true, 70);
		this.listOfMachines.add(wm3);

		WashingMachine wm4 = new WashingMachine(WMConstants.TOP_TYPE, WMConstants.WHIRLPOOL, 105, 1400,
				56, false, 150);
		this.listOfMachines.add(wm4);

		WashingMachine wm5 = new WashingMachine(WMConstants.FRONT_TYPE, WMConstants.GORENJE, 360, 2000,
				70, false, 300);
		this.listOfMachines.add(wm5);

		WashingMachine wm6 = new WashingMachine(WMConstants.HYBRID_TYPE, WMConstants.VIDEOCON, 300,
				2000, 85, false, 310);
		this.listOfMachines.add(wm6);

		this.machinesList.add(this.listOfMachines.get(0).getBrandName());
		this.machinesList.add(this.listOfMachines.get(1).getBrandName());
		this.machinesList.add(this.listOfMachines.get(2).getBrandName());
		this.machinesList.add(this.listOfMachines.get(3).getBrandName());
		this.machinesList.add(this.listOfMachines.get(4).getBrandName());
		this.machinesList.add(this.listOfMachines.get(5).getBrandName());

		this.adapter = new ArrayAdapter<String>(this,
				android.R.layout.simple_list_item_1, this.machinesList);
		this.machines.setAdapter(adapter);

		this.machines.setOnItemClickListener(new OnItemClickListener() {
			@Override
			public void onItemClick(AdapterView<?> arg0, View arg1, int arg2,
					long arg3) {
				Intent k = new Intent(MainActivity.this, DetailsActivity.class);
				k.putExtra(WMConstants.MACHINE_TYPE, listOfMachines.get(arg2).getType());
				k.putExtra(WMConstants.MACHINE_BRAND_NAME, listOfMachines.get(arg2).getBrandName());
				k.putExtra(WMConstants.MACHINE_WEIGHT, listOfMachines.get(arg2).getWeight());
				k.putExtra(WMConstants.MACHINE_MAX_RPM, listOfMachines.get(arg2).getMaxRpm());
				k.putExtra(WMConstants.MACHINE_WASH_TEMP, listOfMachines.get(arg2).getWashTemp());
				k.putExtra(WMConstants.MACHINE_HAS_ENERGY_STAR, listOfMachines.get(arg2).isHasEnergyStar());
				k.putExtra(WMConstants.MACHINE_POWER_USAGE, listOfMachines.get(arg2).getPowerUsage());
				startActivity(k);

			}
		});

	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
