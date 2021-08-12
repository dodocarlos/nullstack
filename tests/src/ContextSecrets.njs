import Nullstack from 'nullstack';

class ContextSecrets extends Nullstack {

  secrets = {};

  static async start({secrets}) {
    secrets.someSecretValue = 'someSecretValue';
    secrets.anotherSecretValue = 'anotherSecretValue';
  }

  static async leakSecrets({secrets}) {
    return secrets;
  }

  async initiate() {
    this.secrets = await this.leakSecrets();
  }
  
  render({secrets}) {
    return (
      <div> 
        <div data-secrets={!!secrets} />
        <div data-key={this.secrets.key} />
        <div data-camelized-key={this.secrets.camelizedKey} />
        <div some-secret-value={this.secrets.someSecretValue} />
        <div another-secret-value={this.secrets.anotherSecretValue} />
      </div>
    )
  }

}

export default ContextSecrets;