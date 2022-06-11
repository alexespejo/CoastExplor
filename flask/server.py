from pydoc import describe
from flask import Flask, request
from twilio.rest import Client

app = Flask(__name__)
account_sid = 'AC440735b8765755186361f9203261bbbe'
auth_token = '02d60780747daa66e5c8ddd92e47f58d'
client = Client(account_sid, auth_token)


@app.route('/sendsms', methods=['GET', 'POST'])
def index():

    header = request.form.get("beach")
    description = request.form.get('description')
    date_time = request.form.get('date_time')
    date_type = request.form.get("date_type")
    if (date_type == None):
        date_type = "Exploring"
    else:
        date_type = "Date"
    formated_string = f"{header}\n\n{description}\n\n{date_time} {date_type}"
    print(formated_string)
    # client.messages.create(
    #     messaging_service_sid='MG83b6a0b8490a6f0fd169c6761ef13e0c',
    #     body=formated_string,
    #     to='+15623352217'
    # )

    return ('', 204)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
