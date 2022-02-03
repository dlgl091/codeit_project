$(function(){
    // el = 각 아이템 (일회용컵,비닐봉지,페트병,배달용기)
    // down, up = 갯수 늘리고 줄이는 버튼
    // 그 외의 것들 = 아이템들에게 이름과 그에 맞는 데이터 값
	var $el = $(".select-el-holder ul li .each-el"),
		$down = $(".countDown"),
		$up = $(".countUp");
	var itemNameArr = ["아이스팩","비닐봉지","페트병","배달용기"];
	var userSelectCountArr = [null,null,null,null];
    var userSelectValueArr = [false,false,false,false];
    var _data = [
	  {
	    "name": "아이스팩",
	    "weight": "300",
	    "won": "100",
	    "coolbang": "1",
		"coolzzo":"1"
	  },
	  {
	    "name": "비닐봉지",
	    "weight": "10",
	    "won": "1.86",
	    "coolbang": "18.6",
		"coolzzo":"30"
	  },
	  {
	    "name": "페트병",
	    "weight": "15",
	    "won": "2.37",
	    "coolbang": "35.55",
		"coolzzo":"30"
	  },
	  {
	    "name": "배달용기",
	    "weight": "44",
	    "won": "1.64",
	    "coolbang": "72.16",
		"coolzzo":"30"
	  }
	];
    
    // 초기값
    var totalWeight = 0,
        totalWon = 0,
        totalCb = 0,
		totalCz = 0;
    // 최대 갯수 값
	var countMax = 100;

    // el(아이템)을 클릭시 .el-selected 클래스를 추가 시켜 카운트 버튼과 선택취소 버튼 활성화
	$el.on("click", function(e){
		var _ei = $(this).parent("li").attr("data-index");
		if($(this).hasClass("el-selected")){
		}else{
			$(this).addClass("el-selected");
			userSelectValueArr[_ei] = true;
		}
	});

	$(".cancel-btn").on("click", function(e){
		var _ei = $(this).parent("li").attr("data-index");
		$(this).siblings(".each-el").removeClass("el-selected");
		userSelectValueArr[_ei] = false;

	});

	$down.on("click", function(e){
		var _ei = $(this).parent(".count-control").parent("li").attr("data-index");
		removeItemBasket(_ei, userSelectCountArr[_ei]);
		if( userSelectCountArr[_ei] == 1){
			//최소값은 1
		}else{
			userSelectCountArr[_ei] -= 1;
		}
		$(this).siblings(".count-view").find(".count-value").html(userSelectCountArr[_ei]);
		//printUserSelect();
	});

	$up.on("click", function(e){
		var _ei = $(this).parent(".count-control").parent("li").attr("data-index");
		
		if( userSelectCountArr[_ei] == countMax){
			window.alert("선택 최대값은 100개 입니다!")//최대값은 100
		}else{
			userSelectCountArr[_ei] += 1;
		}
		$(this).siblings(".count-view").find(".count-value").html(userSelectCountArr[_ei]);
		addItemBasket(_ei, userSelectCountArr[_ei]);
		
	});

   function removeItemBasket(item_type, count){
	   
	   var type = Number(item_type)+1;
	   var count = count;
   }

   var drawResult = function(weight,won,cb,cz){
        //Math.round은 전달받은 데이터를 반올림하여 정수로 출력합니다. 
        var weight = Math.round(weight),
            won = Math.round(won),
            cb = Math.round(cb);
			cz = Math.round(cz)
        
        
        $("#weight").html(reviseWeight(weight));
        $("#won").html(reviseWeight(won));
        $("#coolbang").html(reviseWeight(cb));
        $("#coolzzo").html(reviseWeight(cz));

   }

    var countUserSelect = function(){
        for(u=0; u<userSelectValueArr.length;u++){
            if(userSelectValueArr[u] == true){
                var count = userSelectCountArr[u];
                var tempWeight, tempWon, tempCb, tempCz;

                for(d=0;d<_data.length;d++){
                    if(_data[d].name == itemNameArr[u]){
                        tempWeight = ( _data[d].weight * count );
                        tempWon = (_data[d].won * count);
                        tempCb = (_data[d].coolbang * count);
						tempCz = (_data[d].coolzzo * count);
                    }
                }
                totalWeight += tempWeight;
                totalWon += tempWon;
                totalCb += tempCb;
				totalCz += tempCz
            }
        }

        drawResult(totalWeight, totalWon, totalCb, totalCz);
        return [totalWeight, totalWon, totalCb, totalCz];
    }

	var reviseWeight = function(n) { // 단위로 환산해서 return
		if(n==0){ return 0;
		} else {
            var r_w;
            if(n>=1000){
                //r_w = ((n/1000));
            }else{
                r_w = n;
            }
			return r_w;
		}
	}
	function removeItemBasket(item_type, count){
		
		var type = Number(item_type)+1;
		var count = count;
 
	}

	$("#GO_RESULT_BTN").on("click", function(e){
		if( userSelectValueArr.indexOf(true) >= 0 ){
			countUserSelect();
		}else{
			$(".non-alert-des").html("항목을 선택해주세요");
			$(".non-alert-des").stop().animate({"opacity":"1"}, 500, function(){
				$(".non-alert-des").delay(1000).animate({"opacity":"0"},50);
			});
		}
	});

	$("#TEST_AGAIN_BTN_TOP").on("click", function(e){
		resetUserSelect();
    })

	var resetUserSelect = function(){
        
		userSelectCountArr = [null,null,null,null],
		userSelectValueArr = [false,false,false,false];
        totalWeight = 0;
        totalEmit = 0;
        totalFP = 0;
        $el.removeClass("el-selected");
        $(".count-control .count-view .count-value").html("0");
		$(".point").html("0");
    }

});
