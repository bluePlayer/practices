package com.example.washingmachines;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

public class DetailsActivity extends Activity {

	private TextView type = null;
	private TextView brandName = null;
	private TextView weight = null;
	private TextView maxRmp = null;
	private TextView washTemp = null;
	private TextView hasEnergyStar = null;
	private TextView powerUsage = null;
	private Button mainListBtn = null;
	private ImageView machineImage = null;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.details);
		setTitle("Machine Details");

		this.type = (TextView) findViewById(R.id.machine_type_view);
		this.brandName = (TextView) findViewById(R.id.brand_name_view);
		this.weight = (TextView) findViewById(R.id.weight_view);
		this.maxRmp = (TextView) findViewById(R.id.max_rpm_view);
		this.washTemp = (TextView) findViewById(R.id.wash_temp_view);
		this.hasEnergyStar = (TextView) findViewById(R.id.has_energy_star_view);
		this.powerUsage = (TextView) findViewById(R.id.power_usage_view);

		String typeValue = getIntent().getStringExtra(WMConstants.MACHINE_TYPE);
		this.type.setText(typeValue);

		String brandNameValue = getIntent().getStringExtra(WMConstants.MACHINE_BRAND_NAME);
		this.brandName.setText(brandNameValue);

		String weightValue = getIntent().getStringExtra(WMConstants.MACHINE_WEIGHT);
		this.weight.setText(weightValue);

		String maxRpmValue = getIntent().getStringExtra(WMConstants.MACHINE_MAX_RPM);
		maxRmp.setText(maxRpmValue);

		String washTempValue = getIntent().getStringExtra(WMConstants.MACHINE_WASH_TEMP);
		washTemp.setText(washTempValue);

		String hasEnergyStarValue = getIntent().getBooleanExtra(
				WMConstants.MACHINE_HAS_ENERGY_STAR, false) ? "yes" : "no";
		hasEnergyStar.setText(hasEnergyStarValue);

		String powerUsageValue = getIntent().getStringExtra(WMConstants.MACHINE_POWER_USAGE);
		powerUsage.setText(powerUsageValue);

		this.machineImage = (ImageView) findViewById(R.id.machine_image);
		this.machineImage.setImageResource(this.setImageResource(this.brandName.getText().toString()));
		
		this.mainListBtn = (Button) findViewById(R.id.main_list_btn);
		this.mainListBtn.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View arg0) {
				finish();
			}
		});
	}

	private int setImageResource(String brandNameStr) {
		int result = 0;
		if (brandNameStr.equals(WMConstants.LG)) {
			result = R.drawable.lg;
		}
		if (brandNameStr.equals(WMConstants.SAMSUNG)) {
			result = R.drawable.samsung;
		}
		if (brandNameStr.equals(WMConstants.BSH)) {
			result = R.drawable.bsh;
		}
		if (brandNameStr.equals(WMConstants.WHIRLPOOL)) {
			result = R.drawable.whirlpool;
		}
		if (brandNameStr.equals(WMConstants.VIDEOCON)) {
			result = R.drawable.videocon;
		}
		if (brandNameStr.equals(WMConstants.GORENJE)) {
			result = R.drawable.gorenje;
		}
		return result;
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.details, menu);
		return true;
	}

}
