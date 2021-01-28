package com.leizhou.viewmodel;

import java.util.Base64;

public class ImageViewModel {
	
	private int id;
	private byte[] banner_pic;
	private byte[] detail_pic;
	private String bannerBase64;
	private String detailBase64;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	
	public byte[] getBanner_pic() {
		return banner_pic;
	}
	public void setBanner_pic(byte[] banner_pic) {
		this.banner_pic = banner_pic;
	}
	public byte[] getDetail_pic() {
		return detail_pic;
	}
	public void setDetail_pic(byte[] detail_pic) {
		this.detail_pic = detail_pic;
	}
	

	
	public String getBannerBase64() {
		if(bannerBase64 == null || bannerBase64.equals("")) {
			setBannerBase64(convertBinImageToString(getBanner_pic()));
		}
		return bannerBase64;
	}
	public void setBannerBase64(String bannerBase64) {
		this.bannerBase64 = bannerBase64;
	}
	public String getDetailBase64() {
		if(detailBase64 == null ||  detailBase64.equals("")) {
			setDetailBase64(convertBinImageToString(getDetail_pic()));
		}
		return detailBase64;
	}
	public void setDetailBase64(String detailBase64) {
		this.detailBase64 = detailBase64;
	}


	
	private static String convertBinImageToString(byte[] accPicture) {
		if (accPicture != null && accPicture.length > 0) {
			return Base64.getEncoder().encodeToString(accPicture);
		} else
			return "";
	}
}
