package com.example.mysecondsvandroidapp;

import android.graphics.Color;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.LinearLayout.LayoutParams;


public class ColorButton {

	private String textStr;
	private int buttonColor;
	private Button button = null;
	private ColorButtonTextView textView = null;
	private ColorButtonTextView textView1 = null;
	private LinearLayout vertical;
	private LinearLayout horizontal;
	
	public ColorButton(Button button, String text, int color, LinearLayout v, LinearLayout h) {
		super();
		this.textStr = text;
		this.buttonColor = color;
		this.vertical = v;
		this.horizontal = h;
		
		this.button = button;
		this.button.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				textView = new ColorButtonTextView(v.getContext());
				textView.setText(textStr);
				textView.setBackgroundColor(buttonColor);
				vertical.addView(textView);
				
				textView1 = new ColorButtonTextView(v.getContext());
				textView1.setText(textStr);
				textView1.setBackgroundColor(buttonColor);
				horizontal.addView(textView1);
				
				if(buttonColor == Color.BLACK)
				{
					textView.setTextColor(Color.WHITE);
					textView1.setTextColor(Color.WHITE);
				}
				else
				{
					textView.setTextColor(Color.BLACK);
					textView1.setTextColor(Color.BLACK);
				}
			}
		});
		
	}
	
}
