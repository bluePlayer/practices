package com.example.mysecondsvandroidapp;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.TextView;
import android.widget.LinearLayout.LayoutParams;

public class ColorButtonTextView extends TextView{

	private LayoutParams textViewParams = null;
	
	public ColorButtonTextView(Context context, AttributeSet attrs, int defStyle) {
		super(context, attrs, defStyle);
		// TODO Auto-generated constructor stub
	}

	public ColorButtonTextView(Context context, AttributeSet attrs) {
		super(context, attrs);
		// TODO Auto-generated constructor stub
	}

	public ColorButtonTextView(Context context) {
		super(context);
		this.textViewParams = new LayoutParams(100, 100);
		this.textViewParams.setMargins(2, 2, 2, 2);
		this.setLayoutParams(textViewParams);
		this.setWidth(100);
		this.setHeight(100);
	}

}
