# Home Challenge: Lucas Boglione


## First - Create SSH Key

For security purposes and to save time when running an Ansible playbook on multiple targets, I would recommend creating an SSH Key on your computer (control node) and copying that SSH Key into the **Site Host** control panel's SSH Keys section. By doing this, you can include those SSH Keys in the VPS configuration when creating new VPS instances.


To begin, you can check if you already have SSH Keys on your computer.

**List SSH Keys:**

```bash
ls -la ~/.ssh
```


If the previous command prints something like this in the terminal, it means that you will need to create new SSH Keys

```
drwx------  14 user  staff   448 28 Jun 22:49 .
drwxr-xr-x+ 41 user  staff  1312 26 Jun 10:19 ..
-rw-------   1 user  staff  1623 28 Jun 22:39 known_hosts
-rw-r--r--   1 user  staff  1273 26 Jun 08:44 known_hosts.old
```


To create a new SSH Key on your computer (control node), you can follow the next  steps. 


**Create a key for Ansible:**

```bash
ssh-keygen -t ed25519 -C "ansible"
```
You will be asked for the name of the file type "ansible" and then a passphrase, which you should leave empty.


The next step is optional but highly recommended for security reasons. However, if you wish to connect to the host without a passphrase, you can skip this step.

**Generate another key with a passphrase:**

```bash
ssh-keygen -t ed25519 -C 'user default'
```
You will be asked for the name of the file. You can use the default value, and then provide a passphrase.


**List al your keys:**

```bash
ls -la ~/.ssh
```

The previous command should prints something like this in the terminal now.

```
drwx------  14 user  staff   448 28 Jun 22:49 .
drwxr-xr-x+ 41 user  staff  1312 26 Jun 10:19 ..
-rw-------   1 user  staff   400 26 Jun 08:33 ansible
-rw-r--r--   1 user  staff    90 26 Jun 08:33 ansible.pub
-rw-------   1 user  staff   444 26 Jun 08:31 id_ed25519
-r--------   1 user  staff    95 26 Jun 08:32 id_ed25519.pub
-rw-------   1 user  staff  1623 28 Jun 22:39 known_hosts
-rw-r--r--   1 user  staff  1273 26 Jun 08:44 known_hosts.old
```

**Display the keys in the terminal:**

```bash
cat ~/.ssh/ansible.pub
```
```bash
cat ~/.ssh/id_ed25519.pub
```

>
>NOTE: For security reasons, it is crucial to copy the content of the public key and not the private key. The public key is the one that includes the .pub extension. If you would like to learn more about how SSH keys work, please refer to the following link <a href="https://kb.sitehost.nz/servers/ssh-keys" target="_blank">SSH Keys</a>
>

## Second - Site-Host Control Panel

**Copy the SSH Keys**

Copy the SSH Keys values into the <a href="https://cp.sitehost.nz/ssh/list-keys" target="_blank">Site Host -> Control Panel -> SSH Keys</a> and create two different SSH Keys. 

**Create your VPS**

You can now create the VPS, I recommend you the latest Ubuntu distro and include both SSH Keys in it.


## Third and last - Configure Ansible

**Configure inventory**

Before proceeding, make sure to configure the `inventory` file with the IP addresses where you want to install this software.

```
[Ubuntu22]
128.128.128.128
128.128.128.128

[Debian11]
128.128.128.128
128.128.128.128
128.128.128.128

[CentOS7]
128.128.128.128
```
>
>NOTE: Please replace `128.128.128.128` with the actual IP address of your VPS.
>

**Create API Key**

You will need to create your <a href="https://cp.sitehost.nz/api/list-keys" target="_blank">API Key</a>. Don't forget to add the IP addresss of your VPS in your API Key configuration -> Allowed IP Addresses.

**Copy API Key**

Open the file `/playbook/docker/src/apiKey.js` and add your API Key to the file.

```
const apiKey = 'your-api-goes-here';
module.exports = {
  apiKey
};
```
**Run the Ansible Playbook**

Finally, execute the command based on your VPS distro:

```bash
ansible-playbook playbook-ubuntu22-04.yml
```
```bash
ansible-playbook playbook-centos7.yml
```
```bash
ansible-playbook playbook-debian11.yml
```