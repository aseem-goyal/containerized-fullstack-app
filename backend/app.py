from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return jsonify({
        "message": "Flask Backend API is running",
        "status": "success"
    })


@app.route("/health")
def health():
    return jsonify({
        "status": "healthy"
    })


@app.route("/process", methods=["POST"])
def process():
    data = request.get_json(silent=True) or {}

    name = data.get("name", "Anonymous")

    return jsonify({
        "message": f"Hello {name}!",
        "status": "success",
        "data_received": True
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
