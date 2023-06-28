# Site-Host 

## Home Challenge: Lucas Boglione

## First - Create SSH Key

If you plan to execute `playbook.yml` on multiple servers simultaneously or for security purposes, I would recommend creating an SSH key on your computer (control node) and copying that SSH key into the **Site Host** control panel's SSH Keys section. By doing this, when you create new VPS instances, you can include those SSH keys in the VPS configuration.


To begin, you can check if you already have SSH keys on your computer.

**List SSH Keys:**

```bash
$ ls -la ~/.ssh
```


**Print id_ed25519.pub file:**

```bash
$ cat ~/.ssh/id_ed25519.pub
```


If you wish to create a new SSH key on your computer (control node), you can follow these steps. To make it easier for you, I have provided a sample IP address `128.128.128.128` in the following commands.

NOTE: Please remember to replace `128.128.128.128` with the actual IP address of the target host.


**Create a key for Ansible:**

```bash
$ ssh-keygen -t ed25519 -C "ansible"
```
You will be asked for the name of the file type "ansible" and then a passphrase, which you should leave empty.


The next step is optional but highly recommended for security reasons. However, if you wish to connect to the host without a passphrase, you can skip this step.

**Generate another key with a passphrase:**

```bash
$ ssh-keygen -t ed25519 -C 'user default'
```
You will be asked for the name of the file. You can use the default value, and then provide a passphrase.


**List al your keys:**

```bash
$ ls -la ~/.ssh
```


**Display the key in the terminal:**

```bash
$ cat ~/.ssh/ansible.pub
$ cat ~/.ssh/id_ed25519.pub
```

Copy these values into the <a href="https://cp.sitehost.nz/ssh/list-keys">Site Host -> Control Panel -> SSH Keys</a> and create two different SSH Keys. Now, when you create the VPS, you can choose to include these SSH Keys.

>
> In case you forgot to select to include your SSH Key when creating your VPS, the following commands are useful for copying your SSH Keys from your computer to the target host.
>

**Copy to Target Host:**

```bash
$ ssh-copy-id -i ~/.ssh/id_ed25519.pub 128.128.128.128
```


**Copy to Target Host:**
```bash
$ ssh-copy-id -i ~/.ssh/ansible.pub 128.128.128.128
```


## Second - Update your computer

To ensure that your computer (control node) is up to date, run the command:

```bash
$ ansible-playbook install_on_control_node.yml
```


## Third and last - Configure Ansible

Before proceeding, make sure to configure the `inventory` file with the IP addresses where you want to install this software.

Later, you will need to configure your <a href="https://cp.sitehost.nz/api/list-keys">API_KEY</a> and add the `IP addresses` to the appropriate section.

Finally, execute the command:

```bash
$ ansible-playbook playbook.yml
```

