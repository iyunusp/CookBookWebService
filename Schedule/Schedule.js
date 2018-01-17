let tables;
let tableView;
let tableDiv;
function setup(){
	tableDiv= createDiv('').size(1000, 400);
	tableDiv.parent('canvas-here');
	tables= loadTable('Schedule/sched.csv', 'csv', 'header',function(table){
		let tabS='';
		tabS+='<table>';
		//tableDiv.html('<table>',true);
		for (var r = 0; r < table.getRowCount(); r++){
			//tableDiv.html('<tr>',true);
			tabS+='<tr>';
			for (var c = 0; c < table.getColumnCount(); c++) {		
				//tableDiv.html('<td>'+table.getString(r, c)+'</td>',true);
				tabS+='<td>'+table.getString(r, c)+'</td>';
			}
			//tableDiv.html('</tr>',true);
			tabS+='</tr>';
		}
		tabS+='</table>';
		//tableDiv.html('</table>',true);
		tableDiv.html(tabS,true);
	});
	
	
    
}