$('#send_notif').on('pageinit', function() {
	//populate target recipients dropbox
	$.post(localStorage.webhost+"group_fetch_list.php")
		.done(function(query_result){
			var groups = JSON.parse(query_result);
			$("#notif_recipient_dropdown").empty();
			for (var i=0; i<groups.length; i++)
			{
				$("#notif_recipient_dropdown").append(new Option(groups[i].group_name+" ("+groups[i].group_type+")",groups[i].group_id))
			}

			$("#send_notif_btn").click(function(){
				//get reg IDs of those members of the chosen group
				$.post(localStorage.webhost+"group_fetch_regids.php",{groupid:$("#notif_recipient_dropdown").val()})
					.done(function(data){
						var regids = JSON.parse(data);
						var regids_array = [];
						for (var i=0; i<regids.length; i++)
						{
							regids_array.push(regids[i].reg_id);
						}
						//alert(regids_array);

						//send msg
						$.post(localStorage.webhost+"send_notif_gcm.php",
							{
								'regids[]' : regids_array,
								notif_msg : $("#notif_msg").val()

							}).done(function(res){
								alert(res);
								//do something after successful sending of notifs
								});
					});//end of $post group fetch regids
				});//end of send notif btn click
		});//end of $.post fetch group list
});//end of send_notif pageinit

