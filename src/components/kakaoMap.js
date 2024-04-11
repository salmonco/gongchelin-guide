import { useEffect } from "react";

export default function KakaoMap() {
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
        const options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        const imageSrc = "/images/marker-food.svg"; // 마커이미지의 주소입니다
        const imageSize = new kakao.maps.Size(22, 30); // 마커이미지의 크기입니다
        const imageOption = { offset: new kakao.maps.Point(11, 32) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(
          33.450701,
          126.570667
        );
        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
        });
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      });
    };
    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);

    return () => kakaoMapScript.removeEventListener("load", onLoadKakaoAPI);
  }, []);

  return <div id="map" className="w-full h-full" />;
}
