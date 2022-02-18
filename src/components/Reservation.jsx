import React from 'react';
import '../../public/css/reservation.css'

function Reservation() {
	return (
		<div id="reservation">
			<h2>Vítáme Vás v rezervačním systému!</h2>
			<p>Pro objednání ke kadeřníkovi je potřeba zadat své údaje, abychom Vás mohli <b>kontaktovat</b> pro výběr vhodného termínu a služby.</p>
			<table>
				<tbody>
					<tr>
						<td>
							<label for="fname">Jméno zákazníka</label>
							<br />
							<input type="text" id="res_name" name="fname" />
						</td>
						<td>
							<label for="fname">Telefonní číslo zákazníka</label>
							<br />
							<input type="tel" id="res_phone" name="fname" />
						</td>
						<td>
							Vyplněním a odesláním tohoto formuláře dáváte svůj souhlas se zpracováním osobních údajů dle zákona č. 101/2000 Sb., o ochraně osobních údajů a GDPR.
							<br />
							<label className="container">
								<input type="checkbox" checked="checked" />
								<span className="checkmark"></span>
							</label>
						</td>
					</tr>
				</tbody></table>
			<input value="ODESLAT" id="res_send" type="button" />
		</div>
	)
}

export default Reservation;