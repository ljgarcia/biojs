/** 
 * Table to show binary molecular interactions.  
 * 
 * @class
 * @extends Biojs.Table
 * 
 * @option {string[][]|Object} dataSet 
 *    Either 2D string array containing the whole data to be displayed or a plain object defining the data source. 
 *    
 *    <pre class="brush: js" title="Syntax of the plain object:">
 *    {
 * 		url: &lt;url&gt;,
 * 		proxyUrl: &lt;proxy&gt;,
 * 		paramsMap: { "iDisplayStart": &lt;newName1&gt;, "iDisplayLength": &lt;newName2&gt;, ... },
 * 		filter: &lt;flag&gt;,
 * 		version: &lt;MITAB_VERSION&gt;,
 *      totalRecords:&lt;number&gt;
 *    }
 *    </pre>
 *    where:
 *      <ul>
 *        <li><b>url</b> is string containing the url data source.</li>
 *        <li><b>paramsMap</b> Customize the name of the following params which will be passed to server:
 *    			<ul>
 *    				<li>iDisplayStart: index of the first expected record for paging.</li>
 *    				<li>iDisplayLength: size of the fetched data (page size).</li>
 *    				<li>sSearch: filter string entered by the user in case of filter is enabled.</li>
 *    			</ul>
 *        </li>
 *        <li><b>filter</b> is a boolean to show/hide the search box on the table top. 
 *        The entered string will be passed to the server by means of 'sSearch' parameter.
 *        Personalize the parameter name using paramsMap.</li>
 *        <li><b>proxyUrl</b> optional string containing the url of the proxy in case of needing access to server through a proxy.</li>
 *        <li><b>version</b> either string or integer containing the version of MITAB format as follows:
 *        	<ul>
 *    			<li>"MITAB_VERSION_2_5" or 15: to set <a href="http://code.google.com/p/psicquic/wiki/MITAB25Format">MITAB format v2.5</a></li>
 *    			<li>"MITAB_VERSION_2_5_EXT" or 31: to set MITAB format v2.5 extended</li>
 *    			<li>"MITAB_VERSION_2_6" or 36: to set <a href="http://code.google.com/p/psicquic/wiki/MITAB26Format">MITAB format v2.6</a></li>
 *    			<li>"MITAB_VERSION_2_7" or 42: to set <a href="http://code.google.com/p/psicquic/wiki/MITAB27Format">MITAB format v2.7</a></li>
 *    		</ul>
 *        </li>
 *        <li><b>totalRecords</b> integer containing the number of total records. MITAB format does not contains this value on the response.
 *        You must do a request to ask for it.</li>
 *      </ul>
 *      
 *    <pre class="brush: js" title="Example of plain object: ">
 *    {
 * 		url: 'http://www.ebi.ac.uk/Tools/webservices/psicquic/intact/webservices/current/search/query/species:human',
 * 		paramsMap: { "iDisplayStart": "firstResult", "iDisplayLength": "maxResults" },
 *      totalRecords: 80,
 *      version: "MITAB_VERSION_2_5_EXT",
 *      filter: false
 *    }
 *    </pre>  
 *  
 *    <pre class="brush: js" title="Example of 2D array of data: ">
 *    [
 *		[ 1, "chi", "China", 1347350000, "December 31, 2011", "0.1925" ],
 *		[ 2, "ind", "India", 1210193422, "March 1, 2011", "0.1729" ],
 *		[ 3, "usa", "United States", 313149000, "March 9, 2012", "0.0447" ],
 *		[ 4, "ino", "Indonesia", 237641326, "May 1, 2010", "0.034" ],
 * 		[ 5, "bra", "Brazil", 192376496, "July 1, 2011", "0.0275" ],
 * 		[ 6, "pak", "Pakistan", 178945000, "March 9, 2012", "0.0256" ],
 * 		[ 7, "nig", "Nigeria", 162471000, "July 1, 2011", "0.0232" ],
 * 		[ 8, "rus", "Russia", 143030106, "January 1, 2012", "0.0204" ],
 * 		[ 9, "ban", "Bangladesh", 142319000, "March 15, 2011", "0.0203" ],
 * 		[ 10, "jap", "Japan", 127770000, "February 1, 2012", "0.0183" ],
 * 		[ 11, "mex", "Mexico", 112336538, "June 12, 2010", "0.016" ],
 * 		[ 12, "phi", "Philippines", 94013200, "July 1, 2010", "0.0134" ],
 * 		[ 13, "vie", "Vietnam", 87840000, "December 31, 2011", "0.0125" ],
 * 		[ 14, "eth", "Ethiopia", 84320987,	"July 1, 2012", "0.012" ],
 * 		[ 15, "ger", "Germany", 81796000, "August 31, 2011", "0.0117" ]
 *    ]
 *    </pre>
 * 
 * @example 
 * var myTable = new Biojs.InteractionsTable({
 *  	target: "YourOwnDivId",
 *  	dataSet: {
 *  		url: 'http://www.ebi.ac.uk/Tools/webservices/psicquic/intact/webservices/current/search/query/species:human',
 *  		proxyUrl: '../biojs/dependencies/proxy/proxy.php',
 *          paramsMap: { "iDisplayStart": "firstResult", "iDisplayLength": "maxResults" },
 *          totalRecords: 80,
 *          version: "MITAB_VERSION_2_5_EXT",
 *          filter: false
 *      },
 *      rowSelection: true
 * });
 * 
 */
Biojs.InteractionsTable = Biojs.Table.extend(
/** @lends Biojs.InteractionsTable# */
{
	constructor: function (options) {
		//Biojs.console.enable();
		
		this._useVersion ( options.dataSet.version | Biojs.InteractionsTable.MITAB_VERSION_2_5_EXT );

		// Calling super's constructor
		this.base(options);
	},

	/**
	 * Default values for the options
	 * @name Biojs.InteractionsTable-opt
	 */
	opt: {
		target: "YourOwnDivId",
		rowSelection: false
	},
	
	/**
	 * Array containing the supported event names
	 * @name Biojs.InteractionsTable-eventTypes
	 */
	eventTypes: [],
	
	/* 
	 * Function: Biojs.InteractionTable._decodeToJSON
	 * Purpose:  Overrides the parent method to decode the received MITAB data into the expected JSON format. 
	 * Returns:  {Object} formatted in the expected JSON. 
	 * Inputs:   data -> {*} MITAB data received from the PSIQUIC server or another one. 
	 */
	_decodeToJSON: function ( mitabData ) {
		Biojs.console.log("DATA DECODING FROM MITAB to JSON");

		var jsonData = {};
		var decoder = new Biojs.InteractionsTable.MITabTxtDecoder(mitabData);
		
		jsonData.aaData = decoder.decodeData();
		jsonData.iTotalRecords = this.getTotalRecords();
		jsonData.iTotalDisplayRecords = this.getTotalRecords();
		
		delete decoder;
		return jsonData;
	},
	
	/* 
	 * Function: Biojs.InteractionTable._useVersion
	 * Purpose:  Set the columns depending on the MITAB format version. 
	 * Returns:  
	 * Inputs:   {string|int} Either the name or the number of columns of the MITAB version. 
	 * 				Use values defined in the static members of Biojs.InteractionsTable declared at the end of this class.
	 */
	_useVersion: function (version) {

		var length = ( (typeof version) == "string" ) ? Biojs.InteractionsTable[version] : version; 
		
		var columnsToHide = [];
		
		switch (length) {
		
			case Biojs.InteractionsTable.MITAB_VERSION_2_7:
				for ( var i = 36; i < 42; i++ ) {
					this.opt.columns[i] = Biojs.InteractionsTable.MITAB_COLUMNS[i];
				} 
				columnsToHide = [36,37,38,39,40,41];
				
			case Biojs.InteractionsTable.MITAB_VERSION_2_6:
				for ( var i = 31; i < 36; i++ ) {
					this.opt.columns[i] = Biojs.InteractionsTable.MITAB_COLUMNS[i];
				} 
				columnsToHide = columnsToHide.concat([31,32,33,34,35]);
				
			case Biojs.InteractionsTable.MITAB_VERSION_2_5_EXT:
				for ( var i = 15; i < 31; i++ ) {
					this.opt.columns[i] = Biojs.InteractionsTable.MITAB_COLUMNS[i];
				} 
				columnsToHide = columnsToHide.concat([15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]);
				
				// Complex expansion 
				this.opt.columns[15].render = this._columnRender.showDescXRef;
				
				// Biological Role A
				this.opt.columns[16].render = this._columnRender.showDescXRef;
				
				// Biological Role B
				this.opt.columns[17].render = this._columnRender.showDescXRef;
				
				// Experimental Role A
				this.opt.columns[18].render = this._columnRender.showRowDescXRef;
				
				// Experimental Role B
				this.opt.columns[19].render = this._columnRender.showRowDescXRef;
				
				// Interactor Type A
				this.opt.columns[20].render = this._columnRender.showDescXRef;
				
				// Interactor Type B
				this.opt.columns[21].render = this._columnRender.showDescXRef;
				
				// XRef Interactor Type A
				this.opt.columns[22].render = this._columnRender.showDescXRef;
				
				// Xref Interactor Type B
				this.opt.columns[23].render = this._columnRender.showDescXRef;
				
				// XRef Interaction 
				this.opt.columns[24].render = this._columnRender.showDescXRef;
				
				// Annotation Interactor A
				this.opt.columns[25].render = this._columnRender.showRowDescXRef;
				
				// Annotations Interactor B
				this.opt.columns[26].render = this._columnRender.showRowDescXRef;
				
				// Annotations Interaction
				this.opt.columns[27].render = this._columnRender.showRowDescXRef;
				
				// NCBI Taxonomy
				this.opt.columns[28].render = this._columnRender.showDescXRef;
				
				// Parameters 
				this.opt.columns[29].render = this._columnRender.showRowDescXRef;
				
				// Creation Date
				this.opt.columns[30].render = this._columnRender.showRowDescXRef;
				
			case Biojs.InteractionsTable.MITAB_VERSION_2_5:
				
				for ( var i = 0; i < 15; i++ ) {
					this.opt.columns[i] = Biojs.InteractionsTable.MITAB_COLUMNS[i];
				} 
				columnsToHide = columnsToHide.concat([2,3,7,8,11,12,13]);
				
				this.opt.columns[0].render = this._columnRender.showProteinXRef;
				this.opt.columns[1].render = this._columnRender.showProteinXRef;
				this.opt.columns[2].render = this._columnRender.showValueXRef;
				this.opt.columns[3].render = this._columnRender.showValueXRef;
				this.opt.columns[4].render = this._columnRender.showValueXRef;
				this.opt.columns[5].render = this._columnRender.showValueXRef;
				
				this.opt.columns[6].render = this._columnRender.showDescXRef;
				
				// NCBI Taxon
				this.opt.columns[9].render = this._columnRender.showDescXRef;
				this.opt.columns[10].render = this._columnRender.showDescXRef;

				// Interaction type
				this.opt.columns[11].render = this._columnRender.showDescXRef;
				
				// source
				this.opt.columns[12].render = this._columnRender.showDescXRef;
				
				// Interaction AC
				this.opt.columns[13].render = this._columnRender.showInteractionXRef;
				
				// Confidence Score 
				this.opt.columns[14].render = this._columnRender.showRawValueXRef;
			
				break;
				
			default :
				Biojs.console.log("Wrong version <"+length+"> ");
		}
		
		
		this.opt.hideColumns = columnsToHide;
		
	},
	
	/* 
	 * Object: Biojs.InteractionTable._columnRender.showProteinXRef
	 * Purpose:  Store the render functions to format values on the table cells.
	 */
	_columnRender: {
		
		/* 
		 * Function: Biojs.InteractionTable._columnRender
		 * Purpose:  Format the string <KEY>:<VALUE>(DESC) as link to Protein
		 * Returns: {string} the formatted value
		 * Inputs:   
		 * 		col -> {int} column index (0-based)
		 * 		dataRow -> {string[]} 1D array containing the whole row on the cell being formatted.
		 * 		currentValue -> {string} raw cell value.
		 */
		showProteinXRef: function (col, dataRow, currentValue) { 
			var tk = new Biojs.InteractionsTable.MITabTxtDecoder(currentValue);
			var newValue = "";
			var xref = {};
			while ( tk.hasNext() ) {
				xref = tk.decodeXRef();
				url = Biojs.InteractionsTable.DATABASE_URL[xref.key];
				newValue += '<a href="' + url + xref.value + '" title="' + xref.desc + '" >' + xref.value + '</a><br/>';
			}
			delete tk;
			return newValue;
		},	
		/* 
		 * Function: Biojs.InteractionTable._columnRender.showInteractionXRef
		 * Purpose:  Format the string <KEY>:<VALUE>(DESC) as link to Interaction 
		 * Returns: {string} the formatted value
		 * Inputs:   
		 * 		col -> {int} column index (0-based)
		 * 		dataRow -> {string[]} 1D array containing the whole row on the cell being formatted.
		 * 		currentValue -> {string} raw cell value.
		 */
		showInteractionXRef: function (col, dataRow, currentValue) { 
			var tk = new Biojs.InteractionsTable.MITabTxtDecoder(currentValue);
			var newValue = "";
			var xref = {};
			while ( tk.hasNext() ) {
				xref = tk.decodeXRef();
				url = Biojs.InteractionsTable.DATABASE_URL[xref.key];
				newValue += '<a href="' + url + 'interaction/' + xref.value + '" title="' + xref.desc + '" >' + xref.value + '</a><br/>';
			}
			delete tk;
			return newValue;
		},
		/* 
		 * Function: Biojs.InteractionTable._columnRender.showValueXRef
		 * Purpose:  Format the string <KEY>:<VALUE>(DESC) as the VALUE text into a <span>
		 * Returns: {string} the formatted value
		 * Inputs:   
		 * 		col -> {int} column index (0-based)
		 * 		dataRow -> {string[]} 1D array containing the whole row on the cell being formatted.
		 * 		currentValue -> {string} raw cell value.
		 */
		showValueXRef: function (col, dataRow, currentValue) { 
			var tk = new Biojs.InteractionsTable.MITabTxtDecoder(currentValue);
			var newValue = "";
			var comma = "";
			var xref; 
			while ( tk.hasNext() ) {
				xref = tk.decodeXRef();
				newValue += comma + '<span title="' + xref.desc + '">' + xref.value + '</span>';
				comma = ', ';
			}
			delete tk;
			return newValue;
		},
		/* 
		 * Function: Biojs.InteractionTable._columnRender.showDescXRef
		 * Purpose:  Format the string <KEY>:<VALUE>(DESC) as linked DESC to the ontology 
		 * Returns: {string} the formatted value
		 * Inputs:   
		 * 		col -> {int} column index (0-based)
		 * 		dataRow -> {string[]} 1D array containing the whole row on the cell being formatted.
		 * 		currentValue -> {string} raw cell value.
		 */
		showDescXRef: function (col, dataRow, currentValue) { 
			var tk = new Biojs.InteractionsTable.MITabTxtDecoder(currentValue);
			var newValue = "";
			while ( tk.hasNext() ) {
				xref = tk.decodeXRef();
				url = Biojs.InteractionsTable.DATABASE_URL[xref.key.replace(/-/gi,'')];
				newValue += '<a href="' + url + xref.value + '" >' + xref.desc + '</a><br/>';
			}
			delete tk;
			return newValue;
		},
		/* 
		 * Function: Biojs.InteractionTable._columnRender.showDescXRef
		 * Purpose:  Format the string <KEY>:<VALUE>(DESC) as the VALUE text 
		 * Returns: {string} the formatted value
		 * Inputs:   
		 * 		col -> {int} column index (0-based)
		 * 		dataRow -> {string[]} 1D array containing the whole row on the cell being formatted.
		 * 		currentValue -> {string} raw cell value.
		 */
		showRawValueXRef: function (col, dataRow, currentValue) { 
			var tk = new Biojs.InteractionsTable.MITabTxtDecoder(currentValue);
			var newValue = "";
			if ( tk.hasNext() ) {
				xref = tk.decodeXRef();
				newValue = xref.value;
			}
			delete tk;
			return newValue;
		},
		
		/* 
		 * Function: Biojs.InteractionTable._columnRender.showDescXRef
		 * Purpose:  Format the string <KEY>:<VALUE>(DESC) as the DESC text 
		 * Returns: {string} the formatted value
		 * Inputs:   
		 * 		col -> {int} column index (0-based)
		 * 		dataRow -> {string[]} 1D array containing the whole row on the cell being formatted.
		 * 		currentValue -> {string} raw cell value.
		 */
		showRowDescXRef: function (col, dataRow, currentValue) { 
			var tk = new Biojs.InteractionsTable.MITabTxtDecoder(currentValue);
			var newValue = "";
			var comma = "";
			while ( tk.hasNext() ) {
				xref = tk.decodeXRef();
				newValue += comma + xref.desc;
				comma = ", ";
			}
			delete tk;
			return newValue;
		}
	}
},
{
	MITabTxtDecoder: function (str) {
		this.buffer = ( str != undefined )? str : "" ;
		this.offset = 0;
		
		this.nextToken = function (delimiter) {
			var token = "";
			var index;
			if ( this.offset < this.buffer.length ) {
				start = this.offset;
				index = this.buffer.indexOf(delimiter, start);
				
				if ( index != -1 ) {
					this.offset = index;
					token = this.buffer.substring(start, index);
					this.offset += delimiter.length;
				} else {
					this.offset = this.buffer.length;
					token = this.buffer.substring(start);
				}
			} else {
				// no more tokens
			}			
			return token;
		}
		
		this.hasNext = function () {
			return this.offset < this.buffer.length;
		}
		
		this.decodeXRef = function () {
			
			var token = "";
			var xref = { key:"", value:"", desc:"" };
			
			token = this.nextToken(":");
				
			if ( token.length > 1 ) {
					
				xref.key = token;
				xref.value = this.nextToken("|").replace(/\"/gi,'');
				
				descIdx = xref.value.indexOf("(");
				
				if ( descIdx != -1 ) {
					xref.desc = xref.value.substring( descIdx +1, xref.value.length -1);
					xref.value = xref.value.substring( 0, descIdx);
				}
				
				Biojs.console.log("XREF<"+ xref.key +">, VALUE<"+ xref.value +">, DESC<"+ xref.desc +">" );
			}
			
			return xref;
		}
		
		this.decodeRow = function () {
			var row = [];
			if ( this.hasNext() ) {
				row = this.nextToken("\n").split("\t");
			}
			return row;
		}
		
		this.decodeData = function () {
			var data = [];
			
			while ( this.hasNext() ){
				data.push(this.decodeRow());
			}
			return data;
		}
		
	},
	/**
     * Number of columns for MITAB 2.5 format.
     * @type {int}
     */
	MITAB_VERSION_2_5: 15,
	/**
     * Number of columns for MITAB 2.5 extended format.
     * @type {int}
     */
	MITAB_VERSION_2_5_EXT: 31,
	/**
     * Number of columns for MITAB 2.6 format.
     * @type {int}
     */
	MITAB_VERSION_2_6: 36,
	/**
     * Number of columns for MITAB 2.7 format.
     * @type {int}
     */
	MITAB_VERSION_2_7: 42,
	/**
     * Columns for all MITAB formats
     * @type {Object[]}
     */
	MITAB_COLUMNS: [
        { name: "Identifier A" },
        { name: "Identifier B"},
        { name: "Alternative id A"}, 
        { name: "Alternative id B"}, 
        { name: "Aliases for A"},
        { name: "Aliases for B"}, 	
        { name: "Detection Method"},
        { name: "first author"},
        { name: "Id of publication"},
        { name: "NCBI taxon A"},
        { name: "NCBI taxon B"},
        { name: "Interaction type"},
        { name: "Source"},
        { name: "Interaction identifier(s)"},
        { name: "Confidence score"},
        { name: "Complex expansion"}, 
        { name: "Biological role A"}, 
        { name: "Biological role B"},
        { name: "Experimental role A"},
        { name: "Experimental role B"},
        { name: "Interactor type A"},
        { name: "Interactor type B"},
        { name: "Xref for interactor A"},
        { name: "Xref for interactor B"},
        { name: "Xref for the interaction"},
        { name: "Annotations for interactor A"},
        { name: "Annotations for Interactor B"},
        { name: "Annotations for the interaction"},
        { name: "NCBI Taxonomy identifier for the host organism"},
        { name: "Parameters of the interaction"},
        { name: "Creation date"},
        { name: "Update date"},
        { name: "Checksum for interactor A"},
        { name: "Checksum for interactor B"},
        { name: "Checksum for interaction"},
        { name: "negative"},
        { name: "Binding domain for interactor A"},
        { name: "Binding domain for interactor B"},
        { name: "Stoichiometry for interactor A"},
        { name: "Stoichiometry for interactor B"},
        { name: "Participant identification method for interactor A"},
        { name: "Participant identification method for interactor B"}
    ],  
    /**
     * Map to translate the XRef key into an URL
     * @type {Object}
     */        
	DATABASE_URL: {
		uniprotkb: 'http://www.uniprot.org/uniprot/',
		intact: 'http://www.ebi.ac.uk/intact/',
		taxid: 'http://www.uniprot.org/taxonomy/',
		psimi: 'http://www.ebi.ac.uk/ontology-lookup/browse.do?ontName=MI&termId='
	}

});