package com.example.mysecondsvandroidapp;

import android.os.Bundle;
import android.app.Activity;
import android.graphics.Color;
import android.view.Menu;
import android.widget.Button;
import android.widget.LinearLayout;

public class MainActivity extends Activity {

	private ColorButton redButton = null;
	private ColorButton greenButton = null;
	private ColorButton blueButton = null;
	private ColorButton whiteButton = null;
	private ColorButton cyanButton = null;
	private ColorButton magentaButton = null;
	private ColorButton yellowButton = null;
	private ColorButton blackButton = null;
	private LinearLayout scrollVertical = null;
	private LinearLayout scrollHorizontal = null;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		initView();
	}

	private void initView() {
		
		this.scrollVertical = (LinearLayout) findViewById(R.id.scroll_vertical);
		this.scrollHorizontal = (LinearLayout) findViewById(R.id.scroll_horizontal);
		
		Button redBtn = (Button) findViewById(R.id.red_btn);
		this.redButton = new ColorButton(redBtn, "Red Color", Color.RED, scrollVertical, scrollHorizontal);
		
		Button greenBtn = (Button) findViewById(R.id.green_btn);
		this.greenButton = new ColorButton(greenBtn, "Green Color", Color.GREEN, scrollVertical, scrollHorizontal);
		
		Button blueBtn = (Button) findViewById(R.id.blue_btn);
		this.blueButton = new ColorButton(blueBtn, "Blue Color", Color.BLUE, scrollVertical, scrollHorizontal);
		
		Button whiteBtn = (Button) findViewById(R.id.white_btn);
		this.whiteButton = new ColorButton(whiteBtn, "White Color", Color.WHITE, scrollVertical, scrollHorizontal);
		
		Button cyanBtn = (Button) findViewById(R.id.cyan_btn);
		this.cyanButton = new ColorButton(cyanBtn, "Cyan Color", Color.CYAN, scrollVertical, scrollHorizontal);
		
		Button magentaBtn = (Button) findViewById(R.id.magenta_btn);
		this.magentaButton = new ColorButton(magentaBtn, "Magenta Color", Color.MAGENTA, scrollVertical, scrollHorizontal);
		
		Button yellowBtn = (Button) findViewById(R.id.yellow_btn);
		this.yellowButton = new ColorButton(yellowBtn, "Yellow Color", Color.YELLOW, scrollVertical, scrollHorizontal);
		
		Button blackBtn = (Button) findViewById(R.id.black_btn);
		this.blackButton = new ColorButton(blackBtn, "Black Color", Color.BLACK, scrollVertical, scrollHorizontal);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
