<?php
	//Magic origin header:
	header("Access-Control-Allow-Origin: *");

	//Function: Checks if a certain number is within the nodes included in
	//area bounded by Andre Soriano Jr. and Carlos Palanca Sr.
	function nodeNumberIsInPalancaSoriano($number)
	{
		$nodeNumbers = array(175, 152, 151, 142, 146, 144, 141 , 139, 174, 145, 143, 140, 173, 136, 135, 134, 148, 147, 133, 132, 130, 131, 129, 128);

		$found = false;
		for($i = 0; $i < sizeof($nodeNumbers); $i++)
		{
			if($number == $nodeNumbers[$i])
			{
				$found = true;
				break;
			}
		}

		return $found;
	}

	//Function: Checks if a certain number is within the nodes included in
	//the area bounded by streets named Santa Lucia, Muralla, and Andres Soriano.
	function nodeNumberIsInIntramuros($number)
	{
		$nodeNumbers = array(89, 120, 28, 30, 29, 176, 177, 36, 27, 90, 32, 31, 33, 35, 55, 39, 37, 38, 91, 92, 93, 94, 95, 78, 79, 54, 96, 40, 104, 103, 102, 101, 100, 99, 98, 97, 41, 105, 106, 107, 108, 109, 110, 44, 43, 42, 114, 113, 112, 111, 46, 45, 123, 122, 47, 115, 116, 117, 49, 121, 48, 119, 51, 50);

		$found = false;
		for($i = 0; $i < sizeof($nodeNumbers); $i++)
		{
			if($number == $nodeNumbers[$i])
			{
				$found = true;
				break;
			}
		}

		return $found;
	}

	//Function: Checks if a pair of node numbers is considered as an edge inside the Intramuros area.
	function edgeIsInIntramuros($paramMatrix, $fromIndex, $toIndex)
	{
		if(nodeNumberIsInIntramuros($fromIndex) && nodeNumberIsInIntramuros($toIndex))
		{
			if($paramMatrix[$fromIndex][$toIndex] != "Infinity")
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}

	//Function: Checks if a pair of node numbers is considered as an edge inside area bounded by Andres Soriano and Carlos Palanca Sr.
	function edgeIsInPalancaSoriano($paramMatrix, $fromIndex, $toIndex)
	{
		if(nodeNumberIsInPalancaSoriano($fromIndex) && nodeNumberIsInPalancaSoriano($toIndex))
		{
			if($paramMatrix[$fromIndex][$toIndex] != "Infinity")
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}

	//Function: Extract the initial digits in the string.
	function extractInitialDigits($string)
	{
		$numericBuffer = "";

		for($i = 0; $i < strlen($string); $i++)
		{
			if(is_numeric($string{$i}))
			{
				$numericBuffer .= $string{$i};
			}
			else
			{
				break;
			}
		}

		return (int) $numericBuffer;
	}

	//Function: Returns the day of week in string depending on the input parameter.
	function getDayOfWeek($dayNumber)
	{
		switch($dayNumber)
		{
			case 0: return "Sunday"; break;
			case 1: return "Monday"; break;
			case 2: return "Tuesday"; break;
			case 3: return "Wednesday"; break;
			case 4: return "Thursday"; break;
			case 5: return "Friday"; break;
			case 6: return "Saturday"; break;
			default: return null; break;
		}
	}

	//Create a two-dimensional array to compute for the
	//average the matrices for each of the worksheets, 
	//given requested day of the week and the time of the day.
	$matrix_length = 203;
	$averageMatrix = array();
	for($i = 0; $i < $matrix_length; $i++)
	{
		array_push($averageMatrix, array());
		for($j = 0; $j < $matrix_length; $j++)
		{
			if($i == $j)
			{
				array_push($averageMatrix[$i], 0);
			}
			else
			{
				array_push($averageMatrix[$i], "Infinity");
			}
		}
	}

	//Declare variable to count the number of worksheets in an Excel file.
	$numOfTotalWorksheetsWithSuchTime = 0;

	//First process the request from SampleAJAX3.html
	$requestDay = $_REQUEST['day']; //e.g. 0 => "Sunday"
	$requestTime = $_REQUEST['time']; //e.g. "08:00PM"

	if(isset($requestDay) && isset($requestTime))
	{
		//Determine the Excel spreadsheet to be opened.
		$fileNameToOpen = getDayOfWeek($requestDay)."TrafficData.xlsx";

		
		//Import PHPExcel class
		require_once './Classes/PHPExcel/IOFactory.php';

		//Initialize the Excel object, given the filename as the parameter.
		$excelObject = PHPExcel_IOFactory::load($fileNameToOpen);

		//Iterate through each of the worksheets.
		foreach($excelObject->getWorksheetIterator() as $worksheet)
		{
			//Get the highest row and column, and the lowest column.
			$highestRow = $worksheet->getHighestRow();
			$highestColumn = $worksheet->getHighestColumn();
			$lowestColumn = "D";

			//Count the number of time period at the current worksheet.
			$timePeriodColumnCount = 1; //Initialize to 1.
			$tempStrCtr = $lowestColumn;
			while($tempStrCtr != $highestColumn)
			{
				$tempStrCtr++;
				$timePeriodColumnCount++;
			}

			$found = false;
			//Find the column that matches the GET request.
			$tempStrCtr = $lowestColumn; //Reset the value.
			for($i = 0; $i < $timePeriodColumnCount; $i++)
			{
				$currString = $worksheet->getCell($tempStrCtr.strval(2))->getFormattedValue();
				if($requestTime == $currString)
				{
					$found = true;
					break;
				}
				$tempStrCtr++;
			}

			//If a query matches, add each of the cells in the current matrix
			//to the averageMatrix[][] array.
			if($found)
			{
				// echo "And the current column is: ".$tempStrCtr."<br>";
				// echo "Number of time-period columns: ".$timePeriodColumnCount."<br>";

				//Initialize the array for the table.
				$table = array();
				$actualNumberOfRows = 469;

				//Populate the array for table.
				for($i = 0; $i < $actualNumberOfRows; $i++)
				{
					//Note: The first node is in row 3.
					//Temporary assumption: Time is 10:00AM
					$currNodeIndex = $worksheet->getCell('B'.strval($i+3))->getValue();
				
					$adjNodeRawString = $worksheet->getCell('C'.strval($i+3))->getValue();
					$adjNodeIndex = extractInitialDigits($adjNodeRawString);
					
					//Cell DX could vary. E.g., Use 'E' for10:30AM traffic data.
					//Add condition-checking to this.
					// $costRawString = $worksheet->getCell('D'.strval($i+3))->getValue();
					$costRawString = $worksheet->getCell($tempStrCtr.strval($i+3))->getValue();
					$cost = extractInitialDigits(strval($costRawString));

					array_push($table, array($currNodeIndex, $adjNodeIndex, $cost));
				}

				//Creating a two-dimensional array. (To store the current matrix)
				$matrix_length = 203;
				$matrix = array();
				for($i = 0; $i < $matrix_length; $i++)
				{
					array_push($matrix, array());
					for($j = 0; $j < $matrix_length; $j++)
					{
						if($i == $j)
						{
							array_push($matrix[$i], 0);
						}
						else
						{
							array_push($matrix[$i], "Infinity");
						}
					}
				}

				$currNum = $table[0][0];
				// print json_encode($table[0]).'<br>';
				// The loop where the control break occurs.
				for($i = 0; $i < sizeof($table); $i++)
				{
					if($table[$i][0] != null)
					{
						if($table[$i][0] != $currNum)
						{
							//This is where the control break occurs.
							$currNum = $table[$i][0];
						}
					}

					//Dump a specific table value into one of the matrix cells.
					$matrix[$currNum][$table[$i][1]] = $table[$i][2];

					if($table[$i][2] == null)
					{
						//Setting the universal default speed to 30km/h will be more erroneous.
						//$matrix[$currNum][$table[$i][1]] = 30;
						//Let's try to set the universal default speed to 20km/h.
						$matrix[$currNum][$table[$i][1]] = 20; //20 km/h
					}
					else
					{
						$matrix[$currNum][$table[$i][1]] = $table[$i][2];
					}

					//Debug: Print the table entries if you want. Uncomment the statement below.
					//echo "matrix[" . $currNum . "][" . $table[$i][1] . "]: " . $matrix[$currNum][$table[$i][1]]."<br>";
				}

				//Populate a matrix cell with 5  and 7 whose edge is inside Intramuros and the upper right area inside the 1km radius, respectively.
				for($i = 0; $i < sizeof($averageMatrix); $i++)
				{
					for($j = 0; $j < sizeof($averageMatrix[$i]); $j++)
					{
						//Check if a specific cell from $matrix is valid.
						if($matrix[$i][$j] != 0 || $matrix[$i][$j] != "Infinity")
						{
							// if(edgeIsInIntramuros($matrix, $i, $j))
							// {
							// 		$matrix[$i][$j] = 10; //kmph!
							// }

							//Alternative logic:
							if($matrix[$i][$j] == 20)
							{
								if(edgeIsInIntramuros($matrix, $i, $j))
								{
									$matrix[$i][$j] = 10; //kmph!
								}
								else if(edgeIsInPalancaSoriano($matrix, $i, $j))
								{
									$matrix[$i][$j] = 7;
								}
							}
						}
					}
				}
				//Add each element of the current matrix to 
				//the average matrix.
				$numOfTotalWorksheetsWithSuchTime++;
				for($i = 0; $i < sizeof($averageMatrix); $i++)
				{
					for($j = 0; $j < sizeof($averageMatrix[$i]); $j++)
					{
						//Check if a specific cell from $matrix is valid.
						if($matrix[$i][$j] != 0 || $matrix[$i][$j] != "Infinity")
						{
							$averageMatrix[$i][$j] += $matrix[$i][$j];
						}
					}
				}

				//Uncomment for debugging purposes.
				//echo json_encode($matrix);
			}
			else
			{
				//echo "No matches found!";
			}

			//echo '<br><br>&lt;END_OF_WORKSHEET_MARKER&gt;<br><br>';
		}

		//echo $numOfTotalWorksheetsWithSuchTime;
		//Now get the average of all the matrices for a particular Excel file.
		if($numOfTotalWorksheetsWithSuchTime != 0)
		{
			for($i = 0; $i < sizeof($averageMatrix); $i++)
			{
				for($j = 0; $j < sizeof($averageMatrix[$i]); $j++)
				{
					if($averageMatrix[$i][$j] != 0 || $averageMatrix[$i][$j] != "Infinity")
					{
						$averageMatrix[$i][$j] /= $numOfTotalWorksheetsWithSuchTime;
					}
				}
			}

			echo json_encode($averageMatrix);
		}

		//Output the final results.
		//$resultArray = array($requestDay, $requestTime);
		//echo json_encode($resultArray);
	}
?>